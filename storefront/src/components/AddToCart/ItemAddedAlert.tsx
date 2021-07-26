import React from 'react';
import {useHistory} from 'react-router-dom'
import { Alert, Button, Row, Col, Container } from 'react-bootstrap'

import './addtocart.scss';

export interface ItemAddedAlertProps {
  productName: string,
  quantity: number,
  show: boolean,
  hideAlert: () => void
};

export const ItemAddedAlert: React.FC<ItemAddedAlertProps> = ({
  productName, quantity, show, hideAlert
}) => {
  const history = useHistory()
  return (
    <Alert variant="primary" show={show} dismissible onClose={hideAlert}>
      <Container className="item-added-alert">
      <Row noGutters>
        <Col className="d-flex align-items-center">
          <strong>{`${productName} (${quantity}) `}</strong>&nbsp;added to Cart
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => history.push('/cart')}>Go to Cart</Button>
        </Col>
      </Row>
      </Container>
    </Alert>
  )
}