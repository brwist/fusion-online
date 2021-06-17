import React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

import './addtocart.scss';

export interface AddToCartProps {}

export const AddToCart: React.FC<AddToCartProps> = ({
  ...props
}) => {
  return (
    <Card className="add-to-cart-card">
      <Card.Body>
        <Card.Subtitle className="mb-4">
          <div className="font-weight-bold">Availability/Lead Time</div>
          10,000 units in stock. Ready to ship.
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
              type="checkbox"
              id="single-order"
              className="font-weight-bold"
              label="Single/One-time Order"
            />
          </div>
          <Row className="mb-3 align-items-center">
            <Col sm={8}>
              <Form.Label className="font-weight-bold">Quantity</Form.Label>
            </Col>
            <Col sm={4} className="text-right">
              <Form.Control
                type="number"
                id="quantity"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="font-weight-bold">
              Unit Price
            </Col>
            <Col sm={6} className="text-right">
              $000.00/<span className="text-muted text-lowercase">unit</span>
            </Col>
          </Row>
        </Card.Text>
        <hr />
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="font-weight-bold">Total</div>
          <div className="font-weight-bold text-larger">$9,985</div>
        </div>
        <Button variant="primary" size="lg" block>
          Add To Cart
        </Button>
      </Card.Body>

      <Card.Footer>
        <Form.Check
          custom
          type="checkbox"
          id="multiple-orders"
          className="font-weight-bold"
          label="Schedule Multiple Orders"
        />
      </Card.Footer>
    </Card>
  );
};
