import React, {useState, useRef} from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { Card, Container, Form, Button, Row } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import {AccountError, SetPassword, MutationSetPasswordArgs } from '../../generated/graphql'
import { SET_PASSWORD } from '../../graphql/account';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Footer } from '../Footer/Footer';

import './resetpasswordform.scss'

export interface ResetPasswordProps {
  setLandingPageAlert(alertInfo: {show: boolean, message: string, variant: string}): void
}

type FormValues = {
  password: string,
  passwordConfirm: string
}

export const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  setLandingPageAlert
}) => {
  const history = useHistory()
  const search = useLocation()?.search;
  const email = new URLSearchParams(search)?.get('email');
  const token = new URLSearchParams(search)?.get('token');

  const { register, reset, handleSubmit, formState: {errors}, watch} = useForm<FormValues>();
  const password = useRef({});
  password.current = watch("password", "");
  const [setPassword, {data}] = useMutation<{setPassword: SetPassword}, MutationSetPasswordArgs>(SET_PASSWORD)
  const [mutationErrors, setMutationErrors] = useState<AccountError[]>([])

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    const password = await setPassword({variables: {token, email, password: payload.password}})

    if (password.data.setPassword.accountErrors.length > 0) {
      setMutationErrors(password.data.setPassword.accountErrors)
    } else {
      reset()
      setMutationErrors([])
      history.push("/")
      setLandingPageAlert({show: true, message: "Your password has been updated. Please sign in.", variant: "primary"})
    }
  }

  return (
    <div className="home">
    <div className="hero">
      <Container>
        <Row>
          <SectionHeader subheading="Account" heading="Set Your Password" borderClass="" />
        </Row>
      </Container>
    </div>

    <Container className="content">
    <Card className="form-reset-password">
        <Card.Body>
          {/* <Card.Title as="h3" className="mb-4">
            Create Password
          </Card.Title> */}
          <Card.Text>
            {mutationErrors.length > 0 && mutationErrors.map((error: AccountError) => {
            return <p className="text-danger">{error.message}</p>
            })}
            <Form className="floating-labels" noValidate  onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Form.Group>
                  <Form.Control
                    type='password' className={errors["password"] ? "is-invalid" : ""} {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 8, message: "Password must be at least 8 characters"}
                  },
                  )} placeholder="New Password"/>
                  <Form.Label>New Password</Form.Label>
                  {errors['password'] ? <div className="invalid-feedback">{errors['password'].message}</div> : null}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type='password'
                    className={errors["passwordConfirm"] ? "is-invalid" : ""}
                    placeholder="Confirm Password"
                    {...register('passwordConfirm', {
                      validate: value =>
                        value === password.current || "The passwords do not match"
                    })}
                  />
                  <Form.Label>Confirm Password</Form.Label>
                  {errors['passwordConfirm'] ? <div className="invalid-feedback">{errors['passwordConfirm'].message}</div> : null}
                </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
        </Container>
    <Footer />
  </div>
  );
};