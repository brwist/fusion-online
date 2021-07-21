import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import './myaccount.scss';

export interface OrderDetailsProps {}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  ...props
}) => {
  return (
    <div className="order-details">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="small">SEE ALL ORDERS</Link>
          <h2 className="h3 mt-1 mb-0">Order Details</h2>
        </div>
        <Button variant="primary">
          Download Invoice
        </Button>
      </header>

      <Card>
        <Card.Body>
          <Row>
            <Col lg={4}>
              <strong>Order Number:</strong> 123456789
            </Col>
            <Col lg={4}>
              <strong>Purchase Date:</strong> Mon 00, 0000
            </Col>
            <Col lg={4} className="text-right">
              <strong>Total:</strong> $0000.00
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Subtitle as="h6" className="mb-4">Payment Method: Credit Card</Card.Subtitle>

          <Row>
            <Col lg={4} className="small">
              American Express<br />
              ****1234
            </Col>
            <Col lg={4}>
              Full Name<br />
              123 Main St.<br />
              City, State 01234, US
            </Col>
            <Col lg={4}>
              <Row>
                <Col>
                  Product Total
                </Col>
                <Col className="text-right">
                  $0000.00
                </Col>
              </Row>
              <Row>
                <Col>
                  Shipping
                </Col>
                <Col className="text-right">
                  Free
                </Col>
              </Row>
              <Row>
                <Col>
                  Sales, Tax, Fees &amp; Surcharges
                </Col>
                <Col className="text-right">
                  $0.00
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Order Total</strong>
                </Col>
                <Col className="text-right">
                  <strong>$0000.00</strong>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Subtitle as="h6" className="mb-4">Shipment</Card.Subtitle>

          <Row>
            <Col lg={4}>
              <div className="font-weight-bold">
                Ship Date:
              </div>
              Mon 00, 0000
            </Col>
            <Col lg={4}>
              <div className="font-weight-bold">
                Shipping Address
              </div>
              Full Name<br />
              123 Main St.<br />
              City, State 01234, US
            </Col>
            <Col lg={4} className="text-right">
              <Button variant="primary">
                Track Package
              </Button>
            </Col>
          </Row>

          <hr />

          <Row className="mb-5">
            <Col lg={4}>
              <div className="small">
                <strong className="text-uppercase">INTEL</strong> 123456789
              </div>
              <Link to="/">Intel® Pentium® Gold 7505 Processor</Link>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
              <div className="small">
                CIPN: AB1234567
              </div>
            </Col>
            <Col lg={3}>
              <div className="font-weight-bold">
                Per Unit Price
              </div>
              <div>
                <strong className="text-primary">$9,985</strong>/unit
              </div>
            </Col>
            <Col lg={1} className="text-center">
              <div className="font-weight-bold">
                Qty
              </div>
              100
            </Col>
            <Col lg={3} className="text-right">
              <div className="font-weight-bold">
                Product Total
              </div>
              $0000.00
            </Col>
            <Col lg={1} className="text-right">
              <FontAwesomeIcon icon={farFaBookmark} />
            </Col>
          </Row>

          <Row className="">
            <Col lg={4}>
              <div className="small">
                <strong className="text-uppercase">INTEL</strong> 123456789
              </div>
              <Link to="/">Intel® Pentium® Gold 7505 Processor</Link>
              <div className="small mt-1">
                Spec Code: 123456 | Ordering Code: 123456
              </div>
              <div className="small">
                CIPN: AB1234567
              </div>
            </Col>
            <Col lg={3}>
              <div className="font-weight-bold">
                Per Unit Price
              </div>
              <div>
                <strong className="text-primary">$9,985</strong>/unit
              </div>
            </Col>
            <Col lg={1} className="text-center">
              <div className="font-weight-bold">
                Qty
              </div>
              100
            </Col>
            <Col lg={3} className="text-right">
              <div className="font-weight-bold">
                Product Total
              </div>
              $0000.00
            </Col>
            <Col lg={1} className="text-right">
              <FontAwesomeIcon icon={farFaBookmark} />
            </Col>
          </Row>

          <hr />

          <div className="font-weight-bold">
            Notes
          </div>
          <div>
            <em>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec.</em>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
