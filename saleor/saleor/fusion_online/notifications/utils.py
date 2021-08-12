import os
import json
import boto3

FUSION_SNS_TOPIC_ARN = os.getenv('FUSION_SNS_TOPIC_ARN', '')

def _send_notification(message):
    client = boto3.client('sns')
    response = client.publish(
        TargetArn=FUSION_SNS_TOPIC_ARN,
        Message=json.dumps({'default': json.dumps(message)}),
        MessageStructure='json'
    )

def send_rfq_notification(rfq_id):
    message = {
        'fo_entity_type': 'RFQ',
        'fo_entity_id': rfq_id,
        'fo_entity_event': 'CREATED'
    }

    _send_notification(message)

def send_shipping_address_notification(shipping_address_id):
    message = {
        'fo_entity_type': 'SHIP_TO_ADDRESS',
        'fo_entity_id': shipping_address_id,
        'fo_entity_event': 'CREATED'
    }

    _send_notification(message)

def send_sales_order_notification(sales_order_id):
    message = {
        'fo_entity_type': 'SALES_ORDER',
        'fo_entity_id': sales_order_id,
        'fo_entity_event': 'CREATED'
    }
    
    _send_notification(message)