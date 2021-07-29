import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';

import './myaccount.scss';

export interface ShippingProps {}

export const Shipping: React.FC<ShippingProps> = ({
  ...props
}) => {
  return (
    <div className="shipping">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Shipping</h2>
      </header>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div className="mb-2">
                Full Name<br />
                123 Main St.<br />
                City, State 01234, US<br />
                (000) 000-0000
              </div>
              <div>
                <Button variant="link" className="small px-0">EDIT ADDRESS</Button> | <Button variant="link" className="small px-0">REMOVE ADDRESS</Button>
              </div>
            </Col>
            <Col className="text-right">
              <Tag size="sm" label="Default" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div className="mb-2">
                Full Name<br />
                123 Main St.<br />
                City, State 01234, US<br />
                (000) 000-0000
              </div>
              <div>
                <Button variant="link" className="small px-0">EDIT ADDRESS</Button> | <Button variant="link" className="small px-0">REMOVE ADDRESS</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Button variant="primary">Add Shipping Address</Button>
    </div>
  );
};
