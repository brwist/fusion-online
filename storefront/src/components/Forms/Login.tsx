import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './login.scss';

export interface LoginProps {}

export const Login: React.FC<LoginProps> = ({
  ...props
}) => {
  return (
    <div className="form-signin">
      <h3 className="mb-4">Sign In</h3>

      <Form className="floating-labels">
        <Form.Group controlId="email">
          <Form.Control type="email" placeholder="Email" required className="is-valid" />
          <Form.Label>Email*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control type="password" placeholder="Password" required />
          <Form.Label>Password*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Text className="mb-3">
          <a href="#">
            Forgot your password?
          </a>
        </Form.Text>

        <Form.Group>
          <Button variant="primary" size="lg" type="submit" block>
            Sign In
          </Button>
        </Form.Group>
      </Form>

      <div className="text-center">
        Don't have an account?<br />
        <a href="#" className="font-weight-bold text-capitalize">
          Register Now
        </a>
      </div>
    </div>
  );
};
