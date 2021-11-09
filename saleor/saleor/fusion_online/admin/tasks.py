from ...celeryconf import app
from .models import ImportRecord
from datetime import datetime

@app.task(bind=True)
def test_task(self, product_data, import_record_id):
    try:
        import_record = ImportRecord.objects.get(pk=import_record_id)
        import_record.status = 'RUNNING'
        import_record.celery_task_id = self.request.id
        import_record.save()
        print('running product updates...')
        # for row in product_data:
        #     item_master_id = int(row['item_master_id'])
        #     print("--row data--", row)
        #     # Find product to update by item_master_id
        #     try:
        #         product = Product.objects.get(metadata__contains={'item_master_id': item_master_id})
        #         print("--product--", product)
        #     except Product.DoesNotExist:
        #         return HttpResponse(f'Error: Could not find product with item_master_id={item_master_id}', status=400)
            
        #     # Update product name
        #     if row.get('name'):
        #         product.name = row['name']
        #     product.save()
        #     print("--PRODUCT NAME UPDATED--")
        #     # Update product slug?? (slugify new product name? - slug appears in storefront url on pdp)
        #     # Update product description
        #     # Update global metadata
        #     # Update product-type specific metadata
        #     # Update global attributes?? (or just manually enter them using the admin dashboard)
        #     # Update product-type specific attributes?? (or just manually enter them using the admin dashboard)
        #     # Update global attribute values
        #     # Update product-type specific attribute values

        #     attr_slugs = ['cpu_cache', 'cpu_lithography']
        #     for attr_slug in attr_slugs:
        #         if row.get(attr_slug):
        #             try:
        #                 attr = Attribute.objects.get(slug=attr_slug)
        #                 # assign attribute values to product, creating new values if they do not exist
        #                 attr_val = AttributeValue.objects.get_or_create(
        #                     name=row[attr_slug],
        #                     slug=slugify(row[attr_slug], allow_unicode=True),
        #                     attribute=attr
        #                 )
        #                 associate_attribute_values_to_instance(product, attr, attr_val[0])
        #             except Attribute.DoesNotExist:
        #                 return HttpResponse(f'Error: Could not find attribute with slug={attr_slug}', status=400)
        #     print("--ATTRIBUTE VALUES UPDATED--")
        import_record.status = 'COMPLETED'
        import_record.end_date = datetime.now()
        import_record.save()
    except Exception as e:
        import_record.status = 'ERROR'
        import_record.message = {"error": str(e)}
        import_record.save()
        print(f'Error in task: {str(e)}')
        
