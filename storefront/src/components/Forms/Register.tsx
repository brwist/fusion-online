import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import './register.scss';

export interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({
  ...props
}) => {
  return (
    <div className="form-register">
      <Row>
        <Col md={6}>
          <h4 className="tagged">Lorem Ipsum Dolor</h4>
          <h3>Lorem ipsum dolor sit amet, consectetur</h3>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu volutpat odio.</p>
        </Col>

        <Col md={6}>
          <Form className="floating-labels">
            <Form.Group controlId="first-name">
              <Form.Control type="text" placeholder="First Name" />
              <Form.Label>First Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="last-name">
              <Form.Control type="text" placeholder="Last Name" />
              <Form.Label>Last Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="Email" />
              <Form.Label>Email*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company-name">
              <Form.Control type="text" placeholder="Company Name" />
              <Form.Label>Company Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="geo-region">
              <Form.Control as="select" custom required>
                <option disabled selected hidden></option>
                <option>Region 1</option>
                <option>Region 2</option>
                <option>Region 3</option>
                <option>Region 4</option>
                <option>Region 5</option>
              </Form.Control>
              <Form.Label>Select Geographic Region*</Form.Label>
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
