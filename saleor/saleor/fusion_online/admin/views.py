from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from ...product.models import Product, Attribute, AttributeValue
from ...product.utils.attributes import associate_attribute_values_to_instance
from django.utils.text import slugify
import csv

def decode_utf8(input_iterator):
    for l in input_iterator:
        yield l.decode('utf-8')

def upload_file(request):
    try:
        if request.method == 'POST':
            product_data = csv.DictReader(decode_utf8(request.FILES['product_list_csv']))
            for row in product_data:
                item_master_id = int(row['item_master_id'])
                print("--row data--", row)
                # Find product to update by item_master_id
                try:
                    product = Product.objects.get(metadata__contains={'item_master_id': item_master_id})
                    print("--product--", product)
                except Product.DoesNotExist:
                    return HttpResponse(f'Error: Could not find product with item_master_id={item_master_id}', status=400)
                
                # Update product name
                if row.get('name'):
                    product.name = row['name']
                product.save()
                print("--PRODUCT NAME UPDATED--")

                # Update Attributes
                attr_slugs = ['cpu_cache', 'cpu_lithography']
                for attr_slug in attr_slugs:
                    if row.get(attr_slug):
                        try:
                            attr = Attribute.objects.get(slug=attr_slug)
                            # assign attribute values to product, creating new values if they do not exist
                            attr_val = AttributeValue.objects.get_or_create(
                                name=row[attr_slug],
                                slug=slugify(row[attr_slug], allow_unicode=True),
                                attribute=attr
                            )
                            associate_attribute_values_to_instance(product, attr, attr_val[0])
                        except Attribute.DoesNotExist:
                            return HttpResponse(f'Error: Could not find attribute with slug={attr_slug}', status=400)
                print("--ATTRIBUTE VALUES UPDATED--")
            return HttpResponse("success")
        else:
            return HttpResponseRedirect('/')
    except Exception as e:
        return HttpResponse(f'error: {str(e)}', status=500)    