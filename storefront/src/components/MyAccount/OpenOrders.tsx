import React from 'react';
import { Link } from "react-router-dom";
import { Card, Table, Button } from 'react-bootstrap';

import './myaccount.scss';
import { OrdersByUser_me_orders_edges } from '@saleor/sdk/lib/queries/gqlTypes/OrdersByUser';


export interface OpenOrdersProps {
  orders: OrdersByUser_me_orders_edges[]
}

export const OpenOrders: React.FC<OpenOrdersProps> = ({
  orders
}) => {
  if (orders.length > 0) {
  return (
    <Card className="open-orders">
      {orders.map(({node: {created, lines, id, statusDisplay, token, number, total}}: OrdersByUser_me_orders_edges) => {
        return (
        <Table key={id} borderless striped responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th>RFQ Number <Link to="/">123456789</Link></th>
            <th>{created}</th>
            <th>${total?.gross.amount}</th>
            <th className="text-center">
              <Link to={`/account/orders/open-orders/${token}`}>See Details</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {lines?.map((line) => {
            return (
              <tr key={line?.id}>
              <td>
                <div>
                  <strong>INTEL</strong> 123456789
                </div>
                <div>
                  <Link to={`/products/${line?.variant?.product.id}`}>{line?.variant?.product.name}</Link>
                </div>
                <div className="small mb-2">
                  CIPN: AB1234567
                </div>
                <div className="small">
                  <strong className="text-primary">$9,985</strong><span className="text-muted">/unit</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>Qty: 100</strong>
                </div>
              </td>
              <td colSpan={2}>
                  <div className="font-weight-bold small">Shipping Address</div>
                  Full Name<br />
                  123 Main St.<br />
                  City, State 01234, US
              </td>
              <td className="text-center" style={{'verticalAlign': 'middle'}}>
                <Button variant="primary">
                  Track Package
                </Button>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
        )
      })}
    </Card>
  );
  } else {
    return (
      <Card>
        <h5>No Open Orders</h5>
      </Card>
    )
  }
};
