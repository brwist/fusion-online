import React, {useState} from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import './resetpasswordform.scss'

export interface ResetPasswordProps {

}

type FormValues = {
  password: string
}

export const ResetPasswordForm: React.FC<ResetPasswordProps> = ({

}) => {
  const { register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    console.log(payload)
  }

  return (
    <Container>
      <Card className="form-reset-password">
        <Card.Body>
          <Card.Title as="h4" className="mb-4 font-weight-bold text-uppercase">
            Reset Password
          </Card.Title>
          <Card.Text>
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