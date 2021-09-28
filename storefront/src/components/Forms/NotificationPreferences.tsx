import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import './notificationpreferences.scss';

export interface NotificationPreferencesProps {}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  ...props
}) => {
  return (
    <Card className="form-notification-preferences">
      <Card.Body>
        <Card.Title as="h5" className="mb-4 font-weight-bold text-uppercase">
          Notification Preferences
        </Card.Title>
        <Card.Text>
          <Form>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Form.Group>
              <Form.Check
                custom
                type="radio"
                name="notify"
                id="notify-yes"
                className="font-weight-bold"
                label="Single/One-time Order"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                custom
                type="radio"
                name="notify"
                id="notify-no"
                className="font-weight-bold"
                label="Single/One-time"
              />
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
