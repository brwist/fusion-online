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

        for row in product_data:
            item_master_id = int(row['item_master_id'])
            # Find product to update by item_master_id
            try:
                product = Product.objects.get(metadata__contains={'item_master_id': item_master_id})
            except Product.DoesNotExist:
                import_record.status = 'ERROR'
                import_record.message = {"error": f'Could not find product with item_master_id "{item_master_id}"'}
                import_record.save()
                return f'Error in task: Could not find product with item_master_id "{item_master_id}"'
            
            # get product type
            product_type = product.product_type.slug

            # Update product name
            product.name = row['name']
            # # Update product description json field
            product.description_json['blocks'] = [{ "key": "a", "data": {}, "text": row['full_description'], "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}]
            product.description_json['entityMap'] = {}
            product.save()

            # Update global metadata
            try:
                for key in metadata['global']:
                    product.metadata[key] = row[key]
                product.save()
            except KeyError as e:
                import_record.status = 'ERROR'
                import_record.message = {"error": f'Could not find global metadata key {str(e)}'}
                import_record.save()
                return f'Error in task: Could not find global metadata key {str(e)}'

            # Update product-type specific metadata
            try:
                for key in metadata[product_type]:
                    product.metadata[key] = row[key]
                product.save()
            except KeyError as e:
                import_record.status = 'ERROR'
                import_record.message = {"error": f'Could not find {product_type.upper()} metadata key {str(e)}'}
                import_record.save()
                return f'Error in task: Could not find {product_type.upper()} metadata key {str(e)}'

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
                        import_record.message = {"error": f'Could not find global attribute with slug "{attr_slug}"'}
                        import_record.save()
                        return f'Error in task: Could not find global attribute with slug "{attr_slug}"'
                    
                    except Exception as e:
                        attr_val = AttributeValue.objects.get(slug=slugify(row[attr_slug], allow_unicode=True))
                        associate_attribute_values_to_instance(product, attr, attr_val)

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
                        import_record.message = {"error": f'Could not find {product_type.upper()} attribute with slug "{attr_slug}"'}
                        import_record.save()
                        return f'Error in task: Could not find {product_type.upper()} attribute with slug "{attr_slug}"'
    
        import_record.status = 'COMPLETED'
        import_record.end_date = datetime.now()
        import_record.save()
    except Exception as e:
        import_record.status = 'ERROR'
        import_record.message = {"error": str(e)}
        import_record.save()
        return f'Error in task: {str(e)}'
        
