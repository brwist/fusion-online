import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './myaccount.scss';
import { EditPaymentMethod } from './Forms/EditPaymentMethod';

export interface PaymentsProps {}

export interface EditMode {
  edit: Boolean;
  paymentMethod: any;
}

interface DeleteMode {
  id: String | null;
  deleting: Boolean;
  errors:
    | {
        message: string;
      }[]
    | [];
}

const defaultDeleteMode = {
  id: null,
  deleting: false,
  errors: [],
};

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
      defaultStripeCard
    }
  }
`;

export const REMOVE_STRIPE_TOKEN = gql`
  mutation removeStripeToken($paymentMethodId: String!) {
    removeStripePaymentMethod(paymentMethodId: $paymentMethodId) {
      user {
        id
        stripeCards {
          id
        }
      }
    }
  }
`;

export const Payments: React.FC<PaymentsProps> = ({ ...props }) => {
  const [editMode, setEditMode] = useState<EditMode | null>();
  const [deleteMode, setDeleteMode] = useState<DeleteMode | null>(defaultDeleteMode);
  const userQuery = useQuery(GET_USER);
  const [removeStripeToken, removeStripeTokenResponse] = useMutation(REMOVE_STRIPE_TOKEN, {
    refetchQueries: ['GetUser'],
    onCompleted: () => {
      handleCloseModal();
    },
  });
  const [defaultStripeCard, setDefaultStripeCard] = useState(null);

  useEffect(() => {
    if (userQuery.data) {
      if (userQuery.data.me.defaultStripeCard) {
        setDefaultStripeCard(userQuery.data.me.defaultStripeCard);
      }
    }
  }, [userQuery]);

  const stripePromise = loadStripe(
    'pk_test_51JeloZGwGY8wmB3De8nkDq2Eex3bllEFKymSMsRiqwXUtxShtr4JVAKjLOi9WxHblgppNkcKTFhe69AFFHCMtesP00O09X3PHO'
  );

  const renderStripeCardRow = (card, index) => {
    const isDefault = defaultStripeCard && defaultStripeCard === card.id;

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
            <Button
              variant="link"
              className="small px-0"
              onClick={() => setEditMode({ edit: true, paymentMethod: card })}
            >
              EDIT CARD
            </Button>{' '}
            |{' '}
            <Button variant="link" className="small px-0" onClick={() => setDeleteMode({ ...deleteMode, id: card.id })}>
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
        <Col className="text-right">{isDefault && <Tag size="sm" label="Default" />}</Col>
      </Row>
    );
  };

  const editHeader = () => {
    if (!editMode) {
      return;
    }
    if (editMode.edit) {
      return `Edit Payment Method`;
    }
    return `New Payment Method`;
  };

  const handleCloseModal = () => {
    setEditMode(null);
    setDeleteMode(defaultDeleteMode);
  };

  const handleNewCardAdded = () => {
    handleCloseModal();
    userQuery.refetch();
  };

  const handleDeleteCard = async () => {
    setDeleteMode({
      ...deleteMode,
      deleting: true,
    });
    removeStripeToken({ variables: { paymentMethodId: deleteMode.id } });
  };

  const deleteLabel = deleteMode.deleting ? `Removing...` : `Remove`;

  return (
    <div className="payments">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Payments</h2>
      </header>

      <Card>
        <Card.Body>
          <React.Fragment>{userQuery?.data?.me?.stripeCards.map((card, index) => renderStripeCardRow(card, index))}</React.Fragment>
          {(!userQuery?.data?.me?.stripeCards || userQuery?.data?.me?.stripeCards?.length === 0) && (
            <p>Please add a payment method.</p>
          )}
        </Card.Body>
      </Card>

      <Button variant="primary" onClick={() => setEditMode({ edit: false, paymentMethod: null })}>
        Add Credit Card
      </Button>

      <div className="mt-3 mb-4">
        <em></em>
      </div>

      <Modal show={!!editMode} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">{editHeader()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <EditPaymentMethod
              user={userQuery.data || undefined}
              handleCloseEdit={handleCloseModal}
              onSuccess={handleNewCardAdded}
              editMode={editMode}
              defaultStripeCard={defaultStripeCard}
            />
          </Elements>
        </Modal.Body>
      </Modal>

      <Modal show={!!deleteMode.id} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">Remove Card?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this card?</p>
          <Button variant="danger" onClick={handleDeleteCard}>
            {deleteLabel}
          </Button>
          <Button variant="link" onClick={handleCloseModal}>Cancel</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
