import React, {useState} from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import './changepassword.scss';

export interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  ...props
}) => {
  return (
    <Card className="form-change-password">
      <Card.Body>
        <Card.Title as="h5" className="mb-4 font-weight-bold text-uppercase">
          Change Password
        </Card.Title>
        <Card.Text>
          <Form>
            <Form.Group controlId="current-password">
              <Form.Label>Current Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="current-password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="new-password">
              <Form.Label>New Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="new-password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirm-new-password">
              <Form.Label>Confirm New Password*</Form.Label>
              <Form.Control
                type="password"
                required
                name="confirm-new-password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
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
