import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler, useFormState} from 'react-hook-form';
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

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  region: string;
};

export const Register: React.FC<RegisterProps> = ({
  handleRegistration
}) => {
  const { register, reset, handleSubmit, formState: {errors, isSubmitted, isSubmitSuccessful, isValidating, isValid, touchedFields}} = useForm<FormValues>();

  const [mutationErrors, setMutationErrors] = useState<AccountError[]>([])

  const [accountRegister] = useMutation<AccountRegisterType, AccountRegisterVariables>(CREATE_USER, {})

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    console.log('payload:', payload)
    const {data} = await accountRegister({variables: {input: {...payload, redirectUrl: 'http://localhost:3000/'}}})
    if (data?.accountRegister) {
      if (data.accountRegister.accountErrors.length > 0) {
        setMutationErrors(data.accountRegister.accountErrors)
      } else {
        reset({region: ""})
        setMutationErrors([])
        alert('Email confirmation link sent. Please check your inbox.')
      }
    }
  }

  const textInput = (name: keyof FormValues, label: string, required: boolean = false) => {
    return (
      <Form.Group>
        {required ? (
          <Form.Control type="text" className={errors[name] ? "is-invalid" : ""} {...register(name, { required: true })} placeholder={label}/>
        ) : (
          <Form.Control type="text" {...register(name)} placeholder={label}/>
        )}
        <Form.Label>{label}</Form.Label>
        {errors[name] ? <div className="invalid-feedback">This field is required</div> : null}
      </Form.Group>
    );
  };

  return (
    <div className="form-register">
      <Row>
        <Col md={6} className="pr-md-5">
          <h4 className="tagged">Lorem Ipsum Dolor</h4>
          <h3>Lorem ipsum dolor sit amet, consectetur</h3>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu volutpat odio.</p>
        </Col>

        <Col md={6}>
        {mutationErrors.length > 0 && mutationErrors.map((error: AccountError) => {
          return <p className="text-danger">{error.field}: {error.message}</p>
        })}
          <Form className="floating-labels" noValidate  onSubmit={handleSubmit(onSubmit)}>
            {textInput('firstName', 'First Name', true)}
            {textInput('lastName', 'Last Name', true)}
            {textInput('email', 'Email', true)}
            <Form.Group>
              <Form.Control type='password' className={errors["password"] ? "is-invalid" : ""} {...register('password', {required: true})} placeholder="Password"/>
              <Form.Label>Password</Form.Label>
              {errors['password'] ? <div className="invalid-feedback">This field is required</div> : null}
            </Form.Group>
            {textInput('companyName', 'Company Name', true)}
            <Form.Group controlId="region">
              <Form.Control as="select" className={errors["region"] ? "is-invalid" : ""} required custom {...register('region', {required: true})}>
                <option disabled selected hidden></option>
                <option>Americas</option>
                <option>Asia/Pacific</option>
                <option>EMEA</option>
                <option>Other</option>
              </Form.Control>
              <Form.Label>Select Geographic Region</Form.Label>
              {errors['region'] ? <div className="invalid-feedback">This field is required</div> : null}
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
