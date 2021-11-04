from rest_framework import serializers
from ...product.models import Product, ProductType, Category, Attribute, AttributeValue
from ...product.utils.attributes import associate_attribute_values_to_instance
from ..offer.serializers import VendorSerializer
from ..offer.models import Vendor
from django.utils.text import slugify


CATEGORY_ID_CHOICES = [
    (1000, "CPUs-Server-Intel"),
    (1004, "CPUs-Server-AMD EPYC"),
    (1006, "CPUs-Desktop-Intel"),
    (1007, "CPUs-Desktop-AMD Ryzen Mobile CPU"),
    (1008, "CPUs-Intel"),
    (1001, "Memory-Server-DIMM"),
    (1002, "Memory-GDDR"),
    (1003, "Memory-DRAM"),
    (1009, "Memory-PC-DIMM"),
    (1010, "GPUs-Enterprise"),
    (1011, "GPUs-Consumer"),
    (1005, "Storage-Solid State Drives")
]
CATEGORY_ID_DICT = dict(CATEGORY_ID_CHOICES)


class ProductSerializer(serializers.Serializer):
    mpn = serializers.CharField(max_length=50)
    item_master_id = serializers.IntegerField()
    mcode = serializers.CharField(max_length=10)
    status = serializers.ChoiceField(choices=[("ACTIVE", "Active"), ("INACTIVE", "Inactive")])
    vendors = VendorSerializer(many=True)
    category_id = serializers.ChoiceField(choices=CATEGORY_ID_CHOICES)
    all_description = serializers.CharField(max_length=250, required=False)
    cpu_family = serializers.CharField(max_length=100, required=False, allow_blank=True)
    cpu_type = serializers.CharField(max_length=100, required=False, allow_blank=True)
    cpu_model = serializers.CharField(max_length=100, required=False, allow_blank=True)
    memory_ddr = serializers.CharField(max_length=100, required=False, allow_blank=True)
    memory_type = serializers.CharField(max_length=100, required=False, allow_blank=True)
    memory_density = serializers.CharField(max_length=100, required=False, allow_blank=True)
    memory_rank_org = serializers.CharField(max_length=100, required=False, allow_blank=True)
    memory_speed = serializers.CharField(max_length=100, required=False, allow_blank=True)
    storage_class = serializers.CharField(max_length=100, required=False, allow_blank=True)
    storage_capacity = serializers.CharField(max_length=100, required=False, allow_blank=True)
    storage_size = serializers.CharField(max_length=100, required=False, allow_blank=True)
    storage_type = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_line = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_model = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_memory_config = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_interface = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_cooling = serializers.CharField(max_length=100, required=False, allow_blank=True)
    gpu_packaging = serializers.CharField(max_length=100, required=False, allow_blank=True)

    def create(self, validated_data): 
        if CATEGORY_ID_DICT[validated_data["category_id"]].startswith("CPU"):
            product_type_slug = "cpu"
            attr_slugs = ["cpu_family", "cpu_type", "cpu_model"]
        elif CATEGORY_ID_DICT[validated_data["category_id"]].startswith("GPU"):
            product_type_slug = "gpu"
            attr_slugs =["gpu_line", "gpu_model", "gpu_memory_config", "gpu_interface", "gpu_cooling", "gpu_packaging"]
        elif CATEGORY_ID_DICT[validated_data["category_id"]].startswith("Mem"):
            product_type_slug = "memory"
            attr_slugs = ["memory_ddr", "memory_type", "memory_density", "memory_rank_org", "memory_speed"]
        else:
            product_type_slug = "storage"
            attr_slugs = ["storage_class", "storage_capacity", "storage_size", "storage_type"]
        category_name = CATEGORY_ID_DICT[validated_data["category_id"]]

        # map request data to product model fields and create new product
        product_data = {
            "name": validated_data["all_description"] if validated_data.get('all_description') 
                else f'{validated_data["mcode"]} {validated_data["mpn"]}',
            "slug": slugify(validated_data["all_description"], allow_unicode=True) if validated_data.get('all_description') 
                else slugify(f'{validated_data["mcode"]} {validated_data["mpn"]}', allow_unicode=True),
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
            if validated_data[attr_slug]:
                attribute_value = AttributeValue.objects.get_or_create(name=validated_data[attr_slug], slug=slugify(validated_data[attr_slug], allow_unicode=True), attribute=attribute)
                associate_attribute_values_to_instance(product, attribute, attribute_value[0])
        print("--ATTRIBUTE VALUES STORED--")

        # save mcode, mpn, item_master_id as public metadata
        product_queryset = Product.objects.filter(pk=product.pk)
        product_queryset.update(metadata={
            "mpn": validated_data["mpn"],
            "mcode": validated_data["mcode"],
            "item_master_id": validated_data["item_master_id"],
            "market_insight": ""
        })
        print("--METADATA STORED--")

        # assign status attribute value
        attribute_status = Attribute.objects.get(slug="status")
        attribute_status_value = AttributeValue.objects.get(
            slug=slugify(validated_data["status"], allow_unicode=True),
            attribute=attribute_status
            )
        associate_attribute_values_to_instance(product, attribute_status, attribute_status_value)
        print("--STATUS STORED--")

        # publish product if status is 'ACTIVE'
        if validated_data["status"] == 'ACTIVE':
            product_queryset.update(is_published=True)
            print("--PRODUCT PUBLISHED--")

        # Updates name of existing vendors or creates new vendor, and associates the product with the vendor
        for vendor in validated_data["vendors"]:
            try:
                vendor_instance = Vendor.objects.get(vendor_number=vendor["vendor_number"])
                vendor_instance.vendor_name = vendor["vendor_name"]
                vendor_instance.save()
                vendor_instance.products.add(product)
            except Vendor.DoesNotExist:
                new_vendor = Vendor.objects.create(**vendor)
                new_vendor.products.add(product)
        print("--VENDOR INFO SAVED--")

        return product

    def update(self, instance, validated_data):
        # Updates name of existing vendors or creates new vendor, and associates the product with the vendor
        for vendor in validated_data["vendors"]:
            try:
                vendor_instance = Vendor.objects.get(vendor_number=vendor["vendor_number"])
                vendor_instance.vendor_name = vendor["vendor_name"]
                vendor_instance.save()
                vendor_instance.products.add(instance)
            except Vendor.DoesNotExist:
                new_vendor = Vendor.objects.create(**vendor)
                new_vendor.products.add(instance)
        print("--VENDOR INFO SAVED--")

        # assign status attribute value
        attribute_status = Attribute.objects.get(slug="status")
        attribute_status_value = AttributeValue.objects.get(
            slug=slugify(validated_data["status"], allow_unicode=True),
            attribute=attribute_status
            )
        associate_attribute_values_to_instance(instance, attribute_status, attribute_status_value)
        print("--STATUS UPDATED--")

        # publish product and make visible in listings
        if validated_data["status"] == "ACTIVE":
            instance.visible_in_listings = True
            Product.objects.filter(pk=instance.pk).update(is_published=True)
            print("--PRODUCT PUBLISHED--")
        elif validated_data["status"] == "INACTIVE": 
            instance.visible_in_listings = False
            Product.objects.filter(pk=instance.pk).update(is_published=False)
            print("--PRODUCT UNPUBLISHED--")
        instance.save()
        return instance