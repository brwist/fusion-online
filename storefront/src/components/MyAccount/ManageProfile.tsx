import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { ChangePassword } from '../Forms/ChangePassword';
import { NotificationPreferences} from '../Forms/NotificationPreferences';

export interface ManageProfileProps {}

export const ManageProfile: React.FC<ManageProfileProps> = ({...props}) => {
  return (
    <Container>
      <Row>
        <Col>
          <ChangePassword />
        </Col>
        <Col>
          <NotificationPreferences />
        </Col>
      </Row>
    </Container>
  )
}