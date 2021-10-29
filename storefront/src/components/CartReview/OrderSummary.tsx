import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useCart } from '@saleor/sdk';
import { ICheckoutModelPriceValue } from '@saleor/sdk/lib/helpers';

export interface OrderSummaryProps {
  subtotal: string | 0;
  disableSubmit: any;
  handleSubmit: any;
  shippingPrice: ICheckoutModelPriceValue;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal,
  disableSubmit,
  handleSubmit,
  shippingPrice
}) => {
  const { totalPrice } = useCart();
  const total = totalPrice?.net?.amount?.toFixed(2);
  return (
    <Card className="order-summary">
      <Card.Body>
        <Card.Title as="h5" className="mb-4 font-weight-bold text-uppercase">
          Order Summary
        </Card.Title>
        <Card.Text>
          <Table>
            <tbody>
              <tr>
                <td>Shipment</td>
                <td className="text-right font-weight-bold">${subtotal}</td>
              </tr>
              <tr>
                <td>Sales Tax</td>
                <td className="text-right font-weight-bold">$0.00</td>
              </tr>
              <tr>
                <td>Shipping &amp; Handling</td>
                <td className="text-right font-weight-bold">${shippingPrice?.amount?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Credit Card Processing Fee</td>
                <td className="text-right font-weight-bold">$0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="font-weight-bold text-capitalize">Order Total</td>
                <td className="text-right font-weight-bold">${total}</td>
              </tr>
            </tfoot>
          </Table>

          <Button variant="primary" size="lg" block disabled={disableSubmit} onClick={handleSubmit}>
            Place Order
          </Button>

          <p className="my-3">
            <em>Your data will be securely transmitted</em>
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
