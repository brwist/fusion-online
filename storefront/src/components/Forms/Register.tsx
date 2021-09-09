import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../../graphql/account';
import { AccountRegister, AccountRegisterInput, AccountError } from '../../generated/graphql';

import './register.scss';

export interface RegisterProps {
  handleRegistration(email: string, password: string): Promise<{data: any}>
}

type AccountRegisterVariables = {
  input: AccountRegisterInput
}

type AccountRegisterType = {
  accountRegister: AccountRegister
}

export const Register: React.FC<RegisterProps> = ({
  handleRegistration
}) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    region: "",
    password: "password"
  })
  const [errors, setErrors] = useState<AccountError[]>([])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const [accountRegister] = useMutation<AccountRegisterType, AccountRegisterVariables>(CREATE_USER, {})

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {data} = await accountRegister({variables: {input: {...formValues, redirectUrl: 'http://localhost:3000/'}}})
    if (data?.accountRegister) {
      if (data.accountRegister.accountErrors.length > 0) {
        setErrors(data.accountRegister.accountErrors)
      } else {
        console.log(data.accountRegister.user)
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          region: "",
          password: "password"
        })
        alert('Email confirmation link sent. Please check your inbox.')
      }
    }
  }

  return (
    <div className="form-register">
      <Row>
        <Col md={6} className="pr-md-5">
          <h4 className="tagged">Lorem Ipsum Dolor</h4>
          <h3>Lorem ipsum dolor sit amet, consectetur</h3>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu volutpat odio.</p>
        </Col>

        <Col md={6}>
        {errors.length > 0 && errors.map((error: AccountError) => {
          return <p className="text-danger">{error.field}: {error.message}</p>
        })}
          <Form className="floating-labels" onSubmit={handleSubmit}>
            <Form.Group controlId="first-name">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                />
              <Form.Label>First Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="last-name">
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              />
              <Form.Label>Last Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registration-email">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Form.Label>Email*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company-name">
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formValues.companyName}
                onChange={handleChange}
              />
              <Form.Label>Company Name*</Form.Label>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="geo-region">
              <Form.Control
                as="select"
                custom
                required
                name="region"
                value={formValues.region}
                onChange={handleChange}
              >
                <option disabled selected hidden></option>
                <option>Region 1</option>
                <option>Region 2</option>
                <option>Region 3</option>
                <option>Region 4</option>
                <option>Region 5</option>
              </Form.Control>
              <Form.Label>Select Geographic Region*</Form.Label>
            </Form.Group>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              onSubmit={handleSubmit}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
