import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import { useQuery } from '@apollo/client';
import { GET_CART_PRODUCT_DETAILS } from '../../../config';
import { GET_USER_ADDRESSES } from '../../../graphql/account';
import { User, Address } from '../../../generated/graphql';

import '../cart.scss';

const mockPaymentMethods = [
  {
    method: 'Account Credit',
    billingName: 'Johnny Howell',
    billingStreet1: '123 Turkey Ave',
    billingStreet2: 'Apt 12',
    billingCity: 'Haverhill',
    billingState: 'MA',
    billingZip: '01943',
    billingCountryCode: 'US',
  },
];

export const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  return (
    <>
      <Card>
        <div className="d-flex justify-content-between align-items-start">Payment Methods</div>
        <Table borderless striped responsive>
          <thead className="border-bottom">
            <tr>
              <th></th>
              <th>Carrier</th>
              <th>Method</th>
              <th>Estimated Transit</th>
              <th>Account</th>
            </tr>
          </thead>
          <tbody>
            {mockPaymentMethods.map((paymentMethod, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="radio"
                      defaultChecked={index === 0}
                      onChange={() => setSelectedPaymentMethod(paymentMethod)}
                    />
                  </td>
                  <td>{paymentMethod.method}</td>
                  <td>
                    {paymentMethod.billingName}
                    <br />
                    {`${paymentMethod.billingStreet1} ${paymentMethod.billingStreet2}`}
                    <br />
                    {`${paymentMethod.billingCity}, ${paymentMethod.billingState} ${paymentMethod.billingZip} ${paymentMethod.billingCountryCode}`}
                  </td>
                  <td>{index === 0 && `Default`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button>Continue to Agreement</Button>
      </Card>
    </>
  );
};
