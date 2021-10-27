import React, {useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import {AccountError, SetPassword, MutationSetPasswordArgs } from '../../generated/graphql'
import { SET_PASSWORD } from '../../graphql/account';

import './resetpasswordform.scss'

export interface ResetPasswordProps {

}

type FormValues = {
  password: string
}

export const ResetPasswordForm: React.FC<ResetPasswordProps> = ({

}) => {
  const history = useHistory()
  const search = useLocation()?.search;
  const email = new URLSearchParams(search)?.get('email');
  const token = new URLSearchParams(search)?.get('token');

  const { register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>();
  const [setPassword, {data}] = useMutation<{setPassword: SetPassword}, MutationSetPasswordArgs>(SET_PASSWORD)
  const [mutationErrors, setMutationErrors] = useState<AccountError[]>([])

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    await setPassword({variables: {token, email, ...payload}})
    console.log(data)
    if (data?.setPassword.accountErrors.length > 0) {
      setMutationErrors(data.setPassword.accountErrors)
    } else {
      reset()
      setMutationErrors([])
      history.push("/?password-updated=true")
    }
  }

  return (
    <Container>
      <Card className="form-reset-password">
        <Card.Body>
          <Card.Title as="h4" className="mb-4 font-weight-bold text-uppercase">
            Reset Password
          </Card.Title>
          <Card.Text>
            {mutationErrors.length > 0 && mutationErrors.map((error: AccountError) => {
            return <p className="text-danger">{error.field}: {error.message}</p>
            })}
            <Form className="floating-labels" noValidate  onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Form.Group>
                  <Form.Control type='password' className={errors["password"] ? "is-invalid" : ""} {...register('password', {
                    required: 'Password is required'},
                  )} placeholder="New Password"/>
                  <Form.Label>New Password</Form.Label>
                  {errors['password'] ? <div className="invalid-feedback">{errors['password'].message}</div> : null}
              </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};