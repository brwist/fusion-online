import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { Tag } from '../../Tag/Tag';
import { User, StripePaymentMethod } from '../../../generated/graphql';

type userPaymentMethodsQuery = {
  me: User & { stripeCards: Array<StripePaymentMethod> };
};

const GET_USER_PAYMENTS = gql`
  query GetUserPayments {
    me {
      stripeCards {
        id
        object
        billingDetails {
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          name
        }
        card {
          brand
          last4
          expMonth
          expYear
        }
      }
    }
  }
`;

export const Payment = ({ setSelectedPaymentMethod, selectedPaymentMethod, setActiveTab }) => {
  const paymentMethodsQuery = useQuery(GET_USER_PAYMENTS);

  const handlePaymentSelect = (e, card) => {
    setSelectedPaymentMethod(card);
  };

  useEffect(() => {
    if (paymentMethodsQuery.data) {
      const cards = paymentMethodsQuery.data.me.stripeCards;
      setSelectedPaymentMethod(cards[0]);
    }
  }, [paymentMethodsQuery, setSelectedPaymentMethod]);

  const renderStripeCardRow = (card, index) => {
    const checked = card.id === selectedPaymentMethod?.id;
    return (
      <tr key={index}>
        <td>
          <Form.Check
            custom
            type="radio"
            id={`paymentMethod-${card.id}`}
            value={card.id}
            defaultChecked={index === 0}
            checked={checked}
            onChange={(e) => handlePaymentSelect(e, card)}
          />
        </td>
        <td>
          <div className="mb-2">
            <strong className="transform-uppercase">
              {card.card.brand} ****{card.card.last4}
            </strong>
            <br />
            <small>
              Expires {card.card.expMonth}/{card.card.expYear}
            </small>
          </div>
        </td>
        <td>
          {card.billingDetails.name}
          <br />
          {`${card.billingDetails.address.line1} ${card.billingDetails.address.line2}`}
          <br />
          {`${card.billingDetails.address.city}, ${card.billingDetails.address.state} ${card.billingDetails.address.postalCode} ${card.billingDetails.address.country}`}
          ,
        </td>
        <td>{index === 0 && <Tag size="sm" label="Default" />}</td>
      </tr>
    );
  };

  return (
    <Card.Body>
      <h5>Payment Methods</h5>
      <Table className="mb-4" borderless striped responsive>
        <thead className="border-bottom">
          <tr>
            <th></th>
            <th>Payment Method</th>
            <th>Billing Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paymentMethodsQuery.data?.me?.stripeCards.map((paymentMethod, index: number) => {
            return renderStripeCardRow(paymentMethod, index);
          })}
        </tbody>
      </Table>
      <Button onClick={() => setActiveTab('agreement')}>Continue to Agreement</Button>
    </Card.Body>
  );
};
