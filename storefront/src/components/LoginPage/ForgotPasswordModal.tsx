import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import './forgotpasswordmodal.scss'

export interface ForgotPasswordModalProps {
  show: boolean,
  handleClose: Function
}

type FormValues = {
  email: string
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  show,
  handleClose
}) => {
  const { register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (payload) => {
    console.log(payload)
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