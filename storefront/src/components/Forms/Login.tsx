import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

import './login.scss';

export interface LoginProps {
  handleSignIn(email: string, password: string): void,
  errors: any
}

export const Login: React.FC<LoginProps> = ({
  handleSignIn, errors
}) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  })
  return (
    <div className="form-signin">
      <h3 className="mb-4">Sign In</h3>

      <Form
        className="floating-labels"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignIn(formValues.email, formValues.password)
        }}
      >
        {errors?.map((error: any) => {
          return <p className="text-danger">{error.message}</p>
        })}
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            className="is-valid"
            value={formValues.email}
            onChange={(e) => setFormValues({
              ...formValues,
              email: e.currentTarget.value 
            })}
          />
          <Form.Label>Email*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={formValues.password}
            onChange={(e) => setFormValues({
              ...formValues,
              password: e.currentTarget.value 
            })}
          />
          <Form.Label>Password*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Text className="mb-3">
          <a href="#">
            Forgot your password?
          </a>
        </Form.Text>

        <Form.Group>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            block
            onSubmit={(e) => {
              e.preventDefault()
              handleSignIn(formValues.email, formValues.password)
            }}
          >
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
