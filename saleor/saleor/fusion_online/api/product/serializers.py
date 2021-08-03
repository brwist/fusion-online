from rest_framework import serializers
from ....product.models import Product, ProductType, Category, Attribute, AttributeValue
from ....product.utils.attributes import associate_attribute_values_to_instance
from django.utils.text import slugify

class ProductSerializer(serializers.Serializer):
    mpn = serializers.CharField(max_length=50)
    item_num_id = serializers.IntegerField(max_value=None, min_value=None)
    mcode = serializers.CharField(max_length=10)
    vendors = serializers.ListField(child=serializers.DictField())
    price_item_id = serializers.IntegerField(max_value=None, min_value=None)
    category_id = serializers.IntegerField(max_value=None, min_value=None)
    all_mpn = serializers.CharField(max_length=100, required=False)
    all_mcode = serializers.CharField(max_length=100, required=False)
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
        category_data = { 
            1: { 
                "slug": "cpus",
                "product_type_slug": "cpu",
                "attr_slugs": ["cpu_family", "cpu_type", "cpu_model"]
                }, 
            2: {
                "slug": "gpu",
                "product_type_slug": "gpu",
                "attr_slugs": ["gpu_line", "gpu_model", "gpu_memory_config", "gpu_interface", "gpu_cooling", "gpu_packaging"]
                },
            3: {
                "slug": "memory",
                "product_type_slug": "memory",
                "attr_slugs": ["memory_ddr", "memory_type", "memory_density", "memory_rank_org", "memory_speed"]
                },
            4: {
                "slug": "storage",
                "product_type_slug": "storage",
                "attr_slugs": ["storage_class", "storage_capacity", "storage_size", "storage_type"]
                }
        }
        # map request data to product model fields and create new product
        product_data = {
            "name": validated_data["all_description"] if validated_data.get('all_description') 
                else f'{validated_data["mcode"]} {validated_data["mpn"]}',
            "slug": slugify(validated_data["all_description"], allow_unicode=True) if validated_data.get('all_description') 
                else slugify(f'{validated_data["mcode"]} {validated_data["mpn"]}', allow_unicode=True),
            "mpn": validated_data["mpn"],
            "item_num_id": validated_data["item_num_id"],
            "product_type": ProductType.objects.get(slug=category_data[validated_data["category_id"]]["product_type_slug"]),
            "category": Category.objects.get(slug=category_data[validated_data["category_id"]]["slug"]),
        }

        product = Product.objects.create(**product_data)
        print("--PRODUCT CREATED--")
        
        # assign attribute values to the newly created product for each attribute of the specified category
        # attribute values that do not exist will be created
        for attr_slug in category_data[validated_data["category_id"]]["attr_slugs"]: 
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
        # create new vendor attribute values for each vendor in request body
        for vendor in validated_data["vendors"]:
            attribute_vendor = Attribute.objects.get(slug="vendor")
            AttributeValue.objects.get_or_create(
                name=vendor["vendor_name"],
                slug=vendor["vendor_number"],
                attribute=attribute_vendor
            )
        print("--VENDORS CREATED--")
        return product
