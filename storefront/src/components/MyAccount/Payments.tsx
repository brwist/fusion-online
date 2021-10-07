import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';
import { gql, useQuery } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './myaccount.scss';
import { EditPaymentMethod } from './Forms/EditPaymentMethod';

export interface PaymentsProps {}

interface EditMode {
  edit: Boolean;
  // address?: Address;
}

const GET_USER = gql`
  query GetUser {
    me {
      id
      firstName
      lastName
      email
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

export const Payments: React.FC<PaymentsProps> = ({ ...props }) => {
  const [editMode, setEditMode] = useState<EditMode | null>();
  const userQuery = useQuery(GET_USER);

  const apiKey = process.env.STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(
    'pk_test_51JeloZGwGY8wmB3De8nkDq2Eex3bllEFKymSMsRiqwXUtxShtr4JVAKjLOi9WxHblgppNkcKTFhe69AFFHCMtesP00O09X3PHO'
  );

  const renderStripeCardRow = (card, index) => {
    return (
      <Row key={index}>
        <Col>
          <div className="mb-2">
            <strong className="transform-uppercase">
              {card.card.brand} ****{card.card.last4}
            </strong>
            <br />
            <small>
              Expires {card.card.expMonth}/{card.card.expYear}
            </small>
          </div>
          <div>
            <Button variant="link" className="small px-0">
              EDIT CARD
            </Button>{' '}
            |{' '}
            <Button variant="link" className="small px-0">
              REMOVE CARD
            </Button>
          </div>
        </Col>
        <Col>
          {card.billingDetails.name}
          <br />
          {`${card.billingDetails.address.line1} ${card.billingDetails.address.line2}`}
          <br />
          {`${card.billingDetails.address.city}, ${card.billingDetails.address.state} ${card.billingDetails.address.postalCode} ${card.billingDetails.address.country}`}
          ,
        </Col>
        <Col className="text-right">
          <Tag size="sm" label="Default" />
        </Col>
      </Row>
    );
  };

  const editHeader = () => {
    if (!editMode) {
      return;
    }
    if (editMode.edit) {
      return `Edit Shipping Address`;
    }
    return `New Shipping Address`;
  };

  const handleCloseEdit = () => {
    setEditMode(null);
  };

  const handleNewCardAdded = () => {
    handleCloseEdit();
    userQuery.refetch();
  };

  return (
    <div className="payments">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Payments</h2>
      </header>

      <Card>
        <Card.Body>{userQuery?.data?.me?.stripeCards.map((card, index) => renderStripeCardRow(card, index))}</Card.Body>
      </Card>

      <Button variant="primary" onClick={() => setEditMode({ edit: false })}>
        Add Credit Card
      </Button>

      <div className="mt-3 mb-4">
        <em>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at
          tempor.
        </em>
      </div>

      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Credit</h2>
      </header>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div className="font-weight-bold small">Limit</div>
              <div className="font-weight-bold">$0000.00</div>
            </Col>
            <Col>
              <div className="font-weight-bold small">Limit</div>
              <div className="font-weight-bold">$0000.00</div>
            </Col>
            <Col>
              <div className="font-weight-bold small">Limit</div>
              <div className="font-weight-bold">$0000.00</div>
            </Col>
            <Col>
              <div className="font-weight-bold small">Limit</div>
              <div className="font-weight-bold">$0000.00</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Button variant="primary">Request Credit Increase</Button>

      <div className="mt-3 mb-4">
        <em>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at
          tempor.
        </em>
      </div>

      <div>
        <div className="font-weight-bold">Payment Terms</div>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at
          tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing
          elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu
          volutpat odio. Sed tempus urna et pharetra pharetra.
        </p>
      </div>

      <Modal show={!!editMode} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">{editHeader()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <EditPaymentMethod
              user={userQuery.data || undefined}
              handleCloseEdit={handleCloseEdit}
              onSuccess={handleNewCardAdded}
            />
          </Elements>
        </Modal.Body>
      </Modal>
    </div>
  );
};
