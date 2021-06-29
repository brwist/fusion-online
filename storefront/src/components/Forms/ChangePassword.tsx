import { PasswordChange, PasswordChangeVariables } from '@saleor/sdk/lib/mutations/gqlTypes/PasswordChange';
import { MutationFn } from '@saleor/sdk/lib/react/useMutation';
import React, {useState} from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import './changepassword.scss';
import { ApolloErrorWithUserInput } from '@saleor/sdk/lib/data/ApolloClientManager/types';

export interface ChangePasswordProps {
  setPasswordChange: MutationFn<
      { data: PasswordChange | null; error: ApolloErrorWithUserInput | null; }, 
      PasswordChangeVariables | undefined
    >,
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  setPasswordChange
}) => {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordChange({
      oldPassword: formValues.currentPassword,
      newPassword: formValues.newPassword
    })
    setFormValues({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    })
  }

  return (
    <Card className="form-change-password">
      <Card.Body>
        <Card.Title as="h5" className="mb-4 font-weight-bold text-uppercase">
          Change Password
        </Card.Title>
        <Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="currentPassword"
                value={formValues.currentPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="newPassword"
                value={formValues.newPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="confirmNewPassword"
                value={formValues.confirmNewPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                onSubmit={handleSubmit}
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
