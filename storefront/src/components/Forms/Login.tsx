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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSignIn(formValues.email, formValues.password)
  }
  return (
    <div className="form-signin">
      <h3 className="mb-4">Sign In</h3>

      <Form
        className="floating-labels"
        onSubmit={handleSubmit}
      >
        {errors?.map((error: any) => {
          return <p className="text-danger">{error.message}</p>
        })}
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <Form.Label>Email*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <Form.Label>Password*</Form.Label>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Text className="mb-3">
          <Button variant="link">
            Forgot your password?
          </Button>
        </Form.Text>

        <Form.Group>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            block
            onSubmit={handleSubmit}
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>

      <div className="text-center">
        Don't have an account?<br />
        <Button variant="link" className="font-weight-bold text-capitalize">
          Register Now
        </Button>
      </div>
    </div>
  );
};
