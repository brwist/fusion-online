import os
import json
import boto3

FUSION_SNS_TOPIC_ARN = os.getenv('FUSION_SNS_TOPIC_ARN', '')


def _send_notification(message, type):
    client = boto3.client('sns')
    message_wrapper = {
        'fo_entity_type': type,
        'fo_entity_data': message
    }
    response = client.publish(
        TargetArn=FUSION_SNS_TOPIC_ARN,
        Message=json.dumps({'default': json.dumps(message_wrapper)}),
        MessageStructure='json'
    )


def send_rfq_notification(rfq_serialized):
    _send_notification(rfq_serialized, 'RFQ')


def send_shipping_address_notification(shipping_address_serialized):
    _send_notification(shipping_address_serialized, 'SHIP_TO_ADDRESS')


def send_sales_order_notification(sales_order_serialized):
    _send_notification(sales_order_serialized, 'SALES_ORDER')
