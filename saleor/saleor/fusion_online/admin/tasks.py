from django.utils.text import slugify
from ...celeryconf import app
from .models import ImportRecord
from datetime import datetime
from ...product.models import Product, Attribute, AttributeValue, ProductType
from ...product.utils.attributes import associate_attribute_values_to_instance
from .data.attributes import attributes
from .data.metadata import metadata

@app.task(bind=True)
def test_task(self, product_data, import_record_id):
    try:
        import_record = ImportRecord.objects.get(pk=import_record_id)
        import_record.status = 'RUNNING'
        import_record.celery_task_id = self.request.id
        import_record.save()
        print('running product updates...')
        for row in product_data:
            item_master_id = int(row['item_master_id'])
            # Find product to update by item_master_id
            try:
                product = Product.objects.get(metadata__contains={'item_master_id': item_master_id})
            except Product.DoesNotExist:
                import_record.status = 'ERROR'
                import_record.message = {"error": f'Could not find product with item_master_id "{item_master_id}"'}
                import_record.save()
                print(f'Error in task: Could not find product with item_master_id "{item_master_id}"')
            # get product type
            product_type = product.product_type.slug
            print("product type", product_type)
            # Update product name
            product.name = row['name']
            # # Update product description json field
            # product.description_json = row['description']
            product.save()
            print("--PRODUCT NAME UPDATED--")

            # Update global metadata

            # Update product-type specific metadata
            # Update global attributes?? (or just manually enter them using the admin dashboard)
            # Update product-type specific attributes?? (or just manually enter them using the admin dashboard)
            # Update global attribute values

            for attr_slug in attributes['global']:
                if row[attr_slug]:
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
                        import_record.status = 'ERROR'
                        import_record.message = {"error": f'Could not find attribute with slug "{attr_slug}"'}
                        import_record.save()
                        print(f'Error in task: Could not find attribute with slug "{attr_slug}"')
            print("--GLOBAL ATTRIBUTE VALUES UPDATED--")

            # Update product-type specific attribute values
            for attr_slug in attributes[product_type]:
                if row[attr_slug]:
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
                        import_record.status = 'ERROR'
                        import_record.message = {"error": f'Could not find attribute with slug "{attr_slug}"'}
                        import_record.save()
                        print(f'Error in task: Could not find attribute with slug "{attr_slug}"')
            print(f'--{product_type.upper()} ATTRIBUTE VALUES UPDATED--')
        import_record.status = 'COMPLETED'
        import_record.end_date = datetime.now()
        import_record.save()
    except Exception as e:
        import_record.status = 'ERROR'
        import_record.message = {"error": str(e)}
        import_record.save()
        print(f'Error in task: {str(e)}')
        
