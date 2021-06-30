import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { ChangePassword } from '../Forms/ChangePassword';
import { NotificationPreferences} from '../Forms/NotificationPreferences';
import { usePasswordChange } from "@saleor/sdk";

export interface ManageProfileProps {}

export const ManageProfile: React.FC<ManageProfileProps> = ({
  ...props
}) => {
  const [setPasswordChange, { data, error }] = usePasswordChange();

  return (
    <Container>
      <Row>
        <Col>
          <ChangePassword setPasswordChange={setPasswordChange} error={error ? error!.extraInfo!.userInputErrors : []}/>
        </Col>
        <Col>
          <NotificationPreferences />
        </Col>
      </Row>
    </Container>
  )
}