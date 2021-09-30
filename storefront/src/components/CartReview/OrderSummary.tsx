import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

export interface OrderSummaryProps {
  subtotal: string | 0;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
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
                <td>Shipment 1</td>
                <td className="text-right font-weight-bold">${subtotal}</td>
              </tr>
              <tr>
                <td>Sales Tax</td>
                <td className="text-right font-weight-bold">$0.00</td>
              </tr>
              <tr>
                <td>Shipping & Handling</td>
                <td className="text-right font-weight-bold">$0.00</td>
              </tr>
              <tr>
                <td>Credit Card Processing Fee</td>
                <td className="text-right font-weight-bold">$0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="font-weight-bold text-capitalize">Order Total</td>
                <td className="text-right font-weight-bold">$000.00</td>
              </tr>
            </tfoot>
          </Table>

          <Button variant="primary" size="lg" block>
            Place Order
          </Button>

          <div>Your data will be securely transmitted</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
