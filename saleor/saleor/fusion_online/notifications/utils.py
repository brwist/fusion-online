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


def send_shipping_address_notification(shipping_address_serialized):
    _send_notification(shipping_address_serialized)


def send_sales_order_notification(sales_order_serialized):
    _send_notification(sales_order_serialized)
