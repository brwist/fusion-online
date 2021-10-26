import React, {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client'
import { REQUEST_PASSWORD_RESET } from '../../graphql/account';
import { AccountError } from '../../generated/graphql';

import './forgotpasswordmodal.scss'

export interface ForgotPasswordModalProps {
  show: boolean,
  handleClose: Function
}

type FormValues = {
  email: string
}
const redirectUrl = 'http://localhost:3000/password-reset' 

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  show,
  handleClose
}) => {
  const { register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>();
  const [requestPasswordReset, {data}] = useMutation<any, {email: string, redirectUrl: string}>(REQUEST_PASSWORD_RESET)
  const [mutationErrors, setMutationErrors] = useState<AccountError[]>([])

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    await requestPasswordReset({variables: {...payload, redirectUrl: redirectUrl}})
    console.log(data)
    if (data.requestPasswordReset.accountErrors.length > 0) {
      setMutationErrors(data.requestPasswordReset.accountErrors)
    } else {
      handleClose()
      reset()
      setMutationErrors([])
    }
  }
  return (
    <Modal 
      show={show}
      onHide={() => {
        reset()
        handleClose()
      }}
      size="lg"
      centered
    >
    <Modal.Header closeButton>
      <Modal.Title className="mb-0">Password Reset Request</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-password-reset-request">
      {mutationErrors.length > 0 && mutationErrors.map((error: AccountError) => {
          return <p className="text-danger">{error.field}: {error.message}</p>
        })}
      <Form className="floating-labels" noValidate  onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Form.Group>
            <Form.Control type='email' className={errors["email"] ? "is-invalid" : ""} {...register('email', {
              required: 'Email is required',
              pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
              }},
            )} placeholder="Email"/>
            <Form.Label>Email</Form.Label>
            {errors['email'] ? <div className="invalid-feedback">{errors['email'].message}</div> : null}
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          type="submit"
        >
          Request Password Reset
        </Button>
      </Form>
      </div>
    </Modal.Body>
  </Modal>
  )
}