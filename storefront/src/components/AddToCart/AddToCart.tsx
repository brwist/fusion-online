import React, { useState } from 'react';
import { Row, Col, Card, Button, Form} from 'react-bootstrap';
import { ProductVariant } from '../../generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart as farFaCart } from '@fortawesome/pro-regular-svg-icons';

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
          <Row className="align-items-center">
            <Col sm="auto" lg={4} xl={5} className="d-flex align-items-center">
              <span className="h2 m-0 font-weight-bold">${variant?.pricing?.price?.gross.amount.toFixed(2)}</span>
              &nbsp;
              <span className="text-muted text-lowercase">(unit price)</span>
            </Col>
            <Col sm="auto">
              <Form.Label className="font-weight-bold m-0">Quantity</Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Control
                type="number"
                id="quantity"
                min={0}
                max={variant?.quantityAvailable}
                value={quantitySelected}
                onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
              />
            </Col>
            <Col className="text-right">
              <Button onClick={addToCart} variant="primary">
                Add To Order <FontAwesomeIcon icon={farFaCart} className="ml-1" />
              </Button>
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
          <Row className="align-items-center mb-5">
            <Col sm="auto" lg={4} xl={5} className="d-flex align-items-center">
              <span className="h2 m-0 font-weight-bold">${variant?.pricing?.price?.gross.amount.toFixed(2)}</span>
              &nbsp;
              <span className="text-muted text-lowercase">(unit price)</span>
            </Col>
            <Col sm="auto">
              Total Quantity
            </Col>
            <Col sm="auto">
              <div className="font-weight-bold">200</div>
            </Col>
            <Col className="text-right">
              <Button onClick={addToCart} variant="primary">
                Add To Order <FontAwesomeIcon icon={farFaCart} className="ml-1" />
              </Button>
            </Col>
          </Row>
          <div className="border-bottom">
            <Row className="py-3 align-items-center">
              <Col sm="3" className="font-weight-bold">
                Shipment 1
              </Col>
              <Col sm="auto">
                <Form.Label className="font-weight-bold m-0">Deliver By</Form.Label>
              </Col>
              <Col sm="auto">
                <Form.Control
                  type="text"
                  id="shipment-1-date"
                  value="April 15, 2022"
                />
              </Col>
              <Col sm="auto">
                <Form.Label className="font-weight-bold m-0">Quantity</Form.Label>
              </Col>
              <Col sm="auto">
                <Form.Control
                  type="number"
                  id="shipment-1-quantity"
                  min={0}
                  max={variant?.quantityAvailable}
                  value={quantitySelected}
                  onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
                />
              </Col>
              <Col sm="auto" className="font-weight-bold">
                <Button variant="link" className="text-danger">Remove</Button>
              </Col>
            </Row>
          </div>
          <div className="border-bottom">
            <Row className="py-3 align-items-center">
              <Col sm="3" className="font-weight-bold">
                Shipment 1
              </Col>
              <Col sm="auto">
                <Form.Label className="font-weight-bold m-0">Deliver By</Form.Label>
              </Col>
              <Col sm="auto">
                <Form.Control
                  type="text"
                  id="shipment-1-date"
                  value="April 15, 2022"
                />
              </Col>
              <Col sm="auto">
                <Form.Label className="font-weight-bold m-0">Quantity</Form.Label>
              </Col>
              <Col sm="auto">
                <Form.Control
                  type="number"
                  id="shipment-1-quantity"
                  min={0}
                  max={variant?.quantityAvailable}
                  value={quantitySelected}
                  onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
                />
              </Col>
              <Col sm="auto" className="font-weight-bold">
                <Button variant="link" className="text-danger">Remove</Button>
              </Col>
            </Row>
          </div>

          <Button
            variant="link"
            className="px-0 font-weight-bold"
          >
            Add Shipment +
          </Button>

        </Card.Text>
      </Card.Body>
      <Card.Footer className="flex-column">
        <div className="w-100 mb-3 d-flex justify-content-between align-items-center">
          <div className="font-weight-bold">Total</div>
          <div className="font-weight-bold text-larger">
            ${variant?.pricing?.price?.gross.amount? (quantitySelected * variant?.pricing?.price?.gross.amount).toFixed(2) : 0}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};
