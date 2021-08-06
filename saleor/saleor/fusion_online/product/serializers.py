from rest_framework import serializers
from ...product.models import Product, ProductType, Category, Attribute, AttributeValue
from ...product.utils.attributes import associate_attribute_values_to_instance
from django.utils.text import slugify

CATEGORY_ID_CHOICES = [
    ("CPU_SERVER_INTEL", "CPU Server-Intel"),
    ("CPU_SERVER_AMD_EPYC", "CPU Server-AMD EPYC"),
    ("CPU_DESKTOP_INTEL", "CPU Desktop-Intel"),
    ("CPU_DESKTOP_AMD_RYZEN_MOBILE_CPU", "CPU Desktop-AMD Ryzen Mobile CPU"),
    ("CPU_INTEL", "CPU-Intel"),
    ("MEM_SERVER_DIMM", "Memory-Server DIMM"),
    ("MEM_GDDR", "Memory-GDDR"),
    ("MEM_DRAM", "Memory-DRAM"),
    ("MEM_PC_DIMM", "Memory-PC DIMM"),
    ("GPU_ENTERPRISE", "GPU-Enterprise"),
    ("GPU_CONSUMER", "GPU-Consume"),
    ("STOR_SOLID_STATE_DRIVES", "Storage-Solid State Drives")
]

class ProductSerializer(serializers.Serializer):
    mpn = serializers.CharField(max_length=50)
    item_num_id = serializers.IntegerField(max_value=None, min_value=None)
    mcode = serializers.CharField(max_length=10)
    status = serializers.ChoiceField(choices=[("ACTIVE", "Active"), ("INACTIVE", "Inactive")])
    vendors = serializers.ListField(child=serializers.DictField())
    price_item_id = serializers.IntegerField(max_value=None, min_value=None, required=False)
    category_id = serializers.ChoiceField(choices=CATEGORY_ID_CHOICES)
    all_description = serializers.CharField(max_length=250, required=False)
    cpu_family = serializers.CharField(max_length=100, required=False)
    cpu_type = serializers.CharField(max_length=100, required=False)
    cpu_model = serializers.CharField(max_length=100, required=False)
    memory_ddr = serializers.CharField(max_length=100, required=False)
    memory_type = serializers.CharField(max_length=100, required=False)
    memory_density = serializers.CharField(max_length=100, required=False)
    memory_rank_org = serializers.CharField(max_length=100, required=False)
    memory_speed = serializers.CharField(max_length=100, required=False)
    storage_class = serializers.CharField(max_length=100, required=False)
    storage_capacity = serializers.CharField(max_length=100, required=False)
    storage_size = serializers.CharField(max_length=100, required=False)
    gpu_line = serializers.CharField(max_length=100, required=False)
    gpu_model = serializers.CharField(max_length=100, required=False)
    gpu_memory_config = serializers.CharField(max_length=100, required=False)
    gpu_interface = serializers.CharField(max_length=100, required=False)
    gpu_cooling = serializers.CharField(max_length=100, required=False)
    gpu_packaging = serializers.CharField(max_length=100, required=False)

    def create(self, validated_data): 
        if validated_data["category_id"].startswith("CPU"):
            product_type_slug = "cpu"
            attr_slugs = ["cpu_family", "cpu_type", "cpu_model"]
        elif validated_data["category_id"].startswith("GPU"):
            product_type_slug = "gpu"
            attr_slugs =["gpu_line", "gpu_model", "gpu_memory_config", "gpu_interface", "gpu_cooling", "gpu_packaging"]
        elif validated_data["category_id"].startswith("MEM"):
            product_type_slug = "memory"
            attr_slugs = ["memory_ddr", "memory_type", "memory_density", "memory_rank_org", "memory_speed"]
        else:
            product_type_slug = "storage"
            attr_slugs = ["storage_class", "storage_capacity", "storage_size", "storage_type"]
        category_name = [item[1] for item in CATEGORY_ID_CHOICES if item[0] == validated_data['category_id']][0]

        # map request data to product model fields and create new product
        print(True if validated_data["status"] == "ACTIVE" else False)
        product_data = {
            "name": validated_data["all_description"] if validated_data.get('all_description') 
                else f'{validated_data["mcode"]} {validated_data["mpn"]}',
            "slug": slugify(validated_data["all_description"], allow_unicode=True) if validated_data.get('all_description') 
                else slugify(f'{validated_data["mcode"]} {validated_data["mpn"]}', allow_unicode=True),
            "mpn": validated_data["mpn"],
            "item_num_id": validated_data["item_num_id"],
            "product_type": ProductType.objects.get(slug=product_type_slug),
            "category": Category.objects.get(name=category_name),
            "visible_in_listings": True if validated_data["status"] == "ACTIVE" else False
        }

        product = Product.objects.create(**product_data)
        print("--PRODUCT CREATED--")
        
        # assign attribute values to the newly created product for each attribute of the specified category
        # attribute values that do not exist will be created
        for attr_slug in attr_slugs: 
            attribute = Attribute.objects.get(slug=attr_slug)
            attribute_value = AttributeValue.objects.get_or_create(name=validated_data[attr_slug], slug=slugify(validated_data[attr_slug], allow_unicode=True), attribute=attribute)
            associate_attribute_values_to_instance(product, attribute, attribute_value[0])
        
        print("--ATTRIBUTE VALUES ASSIGNED--")
        # assign mcode attribute value (mcode value that does not exist will be created)
        attribute_mcode = Attribute.objects.get(slug="mcode")
        attribute_mcode_value = AttributeValue.objects.get_or_create(
            name=validated_data["mcode"],
            slug=slugify(validated_data["mcode"], allow_unicode=True),
            attribute=attribute_mcode
            )
        associate_attribute_values_to_instance(product, attribute_mcode, attribute_mcode_value[0])
        print("--MCODE ASSIGNED--")
        # assign status attribute value
        attribute_status = Attribute.objects.get(slug="status")
        attribute_status_value = AttributeValue.objects.get(
            slug=slugify(validated_data["status"], allow_unicode=True),
            attribute=attribute_status
            )
        associate_attribute_values_to_instance(product, attribute_status, attribute_status_value)
        print("--STATUS ASSIGNED--")
        # create new vendor attribute values for each vendor in request body 
        attribute_primary_vendors = Attribute.objects.get(slug="primary-vendors")
        print("primary vendors attribute retrieved")
        attribute_vendor = Attribute.objects.get(slug="vendor")
        print("vendor attribute retrieved")
        attribute_primary_vendors_values = []
        for vendor in validated_data["vendors"]:
            attribute_primary_vendors_values.append(AttributeValue.objects.get_or_create(
                name=vendor["vendor_name"],
                slug=vendor["vendor_number"],
                attribute=attribute_primary_vendors
            )[0])
            AttributeValue.objects.get_or_create(
                name=vendor["vendor_name"],
                slug=vendor["vendor_number"],
                attribute=attribute_vendor
            )
        print("--VENDORS CREATED--")
        associate_attribute_values_to_instance(product, attribute_primary_vendors, *attribute_primary_vendors_values)
        print("vendor associated with product")

        return product

    def update(self, instance, validated_data):
        attribute_primary_vendors = Attribute.objects.get(slug="primary-vendors")
        attribute_vendor = Attribute.objects.get(slug="vendor")
        attribute_primary_vendors_values = []

        for vendor in validated_data["vendors"]:
            attribute_primary_vendors_values.append(AttributeValue.objects.get_or_create(
                name=vendor["vendor_name"],
                slug=vendor["vendor_number"],
                attribute=attribute_primary_vendors
            )[0])
            AttributeValue.objects.get_or_create(
                name=vendor["vendor_name"],
                slug=vendor["vendor_number"],
                attribute=attribute_vendor
            )
        print("--VENDORS RETRIEVED OR CREATED--")
        associate_attribute_values_to_instance(instance, attribute_primary_vendors, *attribute_primary_vendors_values)
        print("--VENDORS UPDATED --")

        # assign status attribute value
        attribute_status = Attribute.objects.get(slug="status")
        attribute_status_value = AttributeValue.objects.get(
            slug=slugify(validated_data["status"], allow_unicode=True),
            attribute=attribute_status
            )
        associate_attribute_values_to_instance(instance, attribute_status, attribute_status_value)

        instance.visible_in_listings = True if validated_data["status"] == 'ACTIVE' else False
        instance.save()
        print("--STATUS UPDATED--")
        return instance