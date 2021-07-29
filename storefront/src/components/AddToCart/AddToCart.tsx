import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { ProductVariant } from '../../generated/graphql';

import './addtocart.scss';

export interface AddToCartProps {
  variant: ProductVariant | undefined | null,
  addItem: any,
  updateQuantity: (quantity: number) => void,
  showItemAddedAlert: () => void
}

export const AddToCart: React.FC<AddToCartProps> = ({
  variant, addItem, updateQuantity, showItemAddedAlert
}) => {
  const [quantitySelected, setQuantitySelected] = useState(1)

  const addToCart = () => {
    addItem(variant?.id, quantitySelected)
    updateQuantity(quantitySelected)
    showItemAddedAlert()
  }

  return (
    <Card className="add-to-cart-card">
      <Card.Body>
        <Card.Subtitle className="mb-4">
          <div className="font-weight-bold mb-2">Availability/Lead Time</div>
          {variant?.quantityAvailable} units in stock. Ready to ship.
        </Card.Subtitle>
        <Card.Text>
          <div className="d-flex justify-content-between">
            <strong>Pricing History</strong>
            [Dates of Last Quarter]
          </div>
          <div className="my-3" style={{width: '100%', height: '180px', background: 'lightgray'}}></div>
          <div className="small">
            Pricing History is based on minimum order amount of 50 units
          </div>
        </Card.Text>
      </Card.Body>

      <div className="border-top"></div>

      <Card.Body>
        <Card.Text>
          <div className="mb-3">
            <Form.Check
              custom
              type="radio"
              name="multi-order"
              id="single-order"
              className="font-weight-bold"
              label="Single/One-time Order"
              checked
            />
          </div>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col sm={8}>
              <Form.Label className="font-weight-bold">Quantity</Form.Label>
            </Col>
            <Col sm={4} className="text-right">
              <Form.Control
                type="number"
                id="quantity"
                min={0}
                max={variant?.quantityAvailable}
                value={quantitySelected}
                onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col sm={6} className="font-weight-bold">
              Unit Price
            </Col>
            <Col sm={6} className="text-right">
              <span className="font-weight-bold">${variant?.pricing?.price?.gross.amount.toFixed(2)}</span>
              /
              <span className="text-muted text-lowercase">unit</span>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>

      <div className="border-top"></div>

      <Card.Body>
        <Card.Text>
          <div className="mb-3">
            <Form.Check
              custom
              type="radio"
              name="multi-order"
              id="multiple-orders"
              className="font-weight-bold"
              label="Schedule Multiple Orders"
            />
          </div>
          <Row className="mb-3 align-items-center">
            <Col sm={6}>
              Shipment 1
            </Col>
            <Col sm={6} className="text-right font-weight-bold">
              <Button variant="link" className="text-danger pr-0">Remove</Button>
            </Col>
          </Row>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col sm={6}>
              <Form.Label className="font-weight-bold">Deliver By</Form.Label>
            </Col>
            <Col sm={6} className="text-right">
              <Form.Control
                type="text"
                id="shipment-1-date"
                value="April 15, 2022"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col sm={8}>
              <Form.Label className="font-weight-bold">Quantity</Form.Label>
            </Col>
            <Col sm={4} className="text-right">
              <Form.Control
                type="number"
                id="shipment-1-quantity"
                min={0}
                max={variant?.quantityAvailable}
                value={quantitySelected}
                onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
              />
            </Col>
          </Form.Group>

          <Button
            variant="link"
            className="border-top border-bottom my-4 font-weight-bold"
            block
          >
            Add Shipment +
          </Button>

          <Row className="mb-3 align-items-center">
            <Col sm={8}>
              <Form.Label className="font-weight-bold">Total Quantity</Form.Label>
            </Col>
            <Col sm={4} className="text-right font-weight-bold">
              250
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="font-weight-bold">
              Unit Price
            </Col>
            <Col sm={6} className="text-right">
              <span className="font-weight-bold">${variant?.pricing?.price?.gross.amount.toFixed(2)}</span>
              /
              <span className="text-muted text-lowercase">unit</span>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="flex-column">
        <div className="w-100 mb-3 d-flex justify-content-between align-items-center">
          <div className="font-weight-bold">Total</div>
          <div className="font-weight-bold text-larger">
            ${variant?.pricing?.price?.gross.amount? (quantitySelected * variant?.pricing?.price?.gross.amount).toFixed(2) : 0}
          </div>
        </div>
        <Button onClick={addToCart} variant="primary" size="lg" block>
          Add To Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};
