from rest_framework import serializers

class ProductSerializer(serializers.Serializer):
    mpn = serializers.CharField(max_length=200)
    item_num_id = serializers.IntegerField(max_value=None, min_value=None)