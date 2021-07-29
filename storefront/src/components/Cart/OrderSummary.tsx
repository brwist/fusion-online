import React, {useState} from 'react';
import { Card, Table, Button } from 'react-bootstrap';

export interface OrderSummaryProps {
  subtotal: string | 0
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal
}) => {
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
            </tbody>
            <tfoot>
              <tr>
                <td className="font-weight-bold text-capitalize">Subtotal</td>
                <td className="text-right font-weight-bold">${subtotal}</td>
              </tr>
            </tfoot>
          </Table>

          <p className="my-3">
            <em>Some text some text some text some text some text some text</em>
          </p>

          <Button variant="primary" size="lg" block>
            Place Order
          </Button>
          <div className="py-3 text-center">
            <strong>OR</strong>
          </div>
          <Button variant="primary" size="lg" block>
            Request for Quote
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
