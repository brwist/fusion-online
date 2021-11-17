import React from 'react';
import { Link } from "react-router-dom";
import { Card, Table, Button, Container } from 'react-bootstrap';
import moment from 'moment';

import './myaccount.scss';
import { OrderCountableEdge } from '../../generated/graphql';


export interface OpenOrdersProps {
  orders: OrderCountableEdge[] | []
}

export const OpenOrders: React.FC<OpenOrdersProps> = ({
  orders
}) => {
  if (orders.length > 0) {
  return (
    <>
    {orders.map(({node: {created, lines, id, statusDisplay, token, number, shippingAddress, total}}: OrderCountableEdge)=> {
      return (
        <Card key={id} className="open-orders">
        <Table borderless striped responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th>Order Number <Link to={`/account/orders/open-orders/${token}`}>{number}</Link></th>
            <th>{moment(created).format('MMM DD, YYYY')}</th>
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
                  <strong>{line?.variant?.product.metadata
                    .find((data) => data.key === 'mcode')
                    ?.value
                  }</strong> <small>{line?.productSku}</small>
                </div>
                <div>
                  <Link to={`/products/${line?.variant?.product.id}`}>{line?.variant?.product.name}</Link>
                </div>
                <div className="small mb-2">
                  CIPN: AB1234567
                </div>
                <div className="small">
                  <strong className="text-primary">${line?.unitPrice?.gross.amount}</strong><span className="text-muted">/unit</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>Qty: {line?.quantity}</strong>
                </div>
              </td>
              <td colSpan={2}>
                  <div className="font-weight-bold small">Shipping Address</div>
                  {shippingAddress?.firstName} {shippingAddress?.lastName}<br />
                  {shippingAddress?.streetAddress1} {shippingAddress?.streetAddress2}<br />
                  {shippingAddress?.city}, {shippingAddress?.countryArea} {shippingAddress?.postalCode}, {shippingAddress?.country.code}
              </td>
              <td className="text-center" style={{'verticalAlign': 'middle'}}>
                <Button variant="primary" disabled>
                  Track Package
                </Button>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
      </Card>
      )
    })}
    </>
  );
  } else {
    return (
      <Container>
        <h5>No Open Orders</h5>
      </Container>
    )
  }
};
