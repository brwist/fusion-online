import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler} from 'react-hook-form';
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
  const { register, handleSubmit, formState: {errors}} = useForm<FormValues>();

  const [mutationErrors, setMutationErrors] = useState<AccountError[]>([])

  const [accountRegister] = useMutation<AccountRegisterType, AccountRegisterVariables>(CREATE_USER, {})

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    console.log('payload:', payload)
    const {data} = await accountRegister({variables: {input: {...payload, redirectUrl: 'http://localhost:3000/'}}})
    if (data?.accountRegister) {
      if (data.accountRegister.accountErrors.length > 0) {
        setMutationErrors(data.accountRegister.accountErrors)
      } else {
        console.log(data.accountRegister.user)
        setMutationErrors([])
        alert('Email confirmation link sent. Please check your inbox.')
      }
    }
  }

  const textInput = (name: keyof FormValues, label: string, required: boolean = false) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        {required ? (
          <input type="text" {...register(name, { required: true })} />
        ) : (
          <input type="text" {...register(name)} />
        )}
        {errors[name] ? <span>This field is required</span> : null}
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
          <Form className="floating-labels" onSubmit={handleSubmit(onSubmit)}>
            {textInput('firstName', 'First Name', true)}
            {textInput('lastName', 'Last Name', true)}
            {textInput('email', 'Email', true)}
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <input type='password' {...register('password', {required: true})}/>
            </Form.Group>
            {textInput('companyName', 'Company Name', true)}
            <Form.Group>
            <Form.Label>Select Geographic Region</Form.Label>
              <select {...register('region', {required: true})}>
                <option disabled selected hidden></option>
                <option>Americas</option>
                <option>Asia/Pacific</option>
                <option>EMEA</option>
                <option>Other</option>
              </select>
              {errors['region'] ? <span>This field is required</span> : null}
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
