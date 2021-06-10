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
        <Form.Group controlId="first-name">
          <Form.Control type="text" placeholder="First Name" className="is-valid" />
          <Form.Label>First Name*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control type="password" placeholder="Password" />
          <Form.Label>Password*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Text className="mb-3">
          <a href="#">
            Forgot your password?
          </a>
        </Form.Text>

        <Form.Group>
          <Button variant="primary" type="submit" block>
            Sign In
          </Button>
        </Form.Group>
      </Form>

      <div className="text-center">
        Don't have an account?<br />
        <a href="#" className="font-weight-bold">
          Register Now
        </a>
      </div>
    </div>
  );
};
