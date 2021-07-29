import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';

import './myaccount.scss';

export interface PaymentsProps {}

export const Payments: React.FC<PaymentsProps> = ({
  ...props
}) => {
  return (
    <div className="payments">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Payments</h2>
      </header>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div className="mb-2">
                <strong className="transform-uppercase">American Express ****1234</strong><br />
                <small>Expires 00/0000</small>
              </div>
              <div>
                <Button variant="link" className="small px-0">EDIT CARD</Button> | <Button variant="link" className="small px-0">REMOVE CARD</Button>
              </div>
            </Col>
            <Col>
              Full Name<br />
              123 Main St.<br />
              City, State 01234, US
            </Col>
            <Col className="text-right">
              <Tag size="sm" label="Default" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Button variant="primary">Add Credit Card</Button>

      <div className="mt-3 mb-4">
        <em>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor.</em>
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
        <em>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor.</em>
      </div>

      <div>
        <div className="font-weight-bold">Payment Terms</div>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Sed tempus urna et pharetra pharetra.</p>
      </div>
    </div>
  );
};
