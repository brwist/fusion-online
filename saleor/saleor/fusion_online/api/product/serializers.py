from rest_framework import serializers
from ....product.models import Product, ProductType

class ProductSerializer(serializers.Serializer):
    mpn = serializers.CharField(max_length=50)
    item_num_id = serializers.IntegerField(max_value=None, min_value=None)
    mcode = serializers.CharField(max_length=10)
    vendors = serializers.ListField(child=serializers.DictField())
    price_item_id = serializers.IntegerField(max_value=None, min_value=None)
    category_id = serializers.IntegerField(max_value=None, min_value=None, required=False)
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
        product_data = {
            "name": "Part " + validated_data["mpn"],
            "slug": validated_data["mpn"],
            }
        product_type = ProductType.objects.get(name="Gold")
        product_data["product_type"] = product_type
        return Product.objects.create(**product_data)
