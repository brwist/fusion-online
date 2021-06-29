import React from 'react';
import { ChangePassword } from '../Forms/ChangePassword';
import { NotificationPreferences } from '../Forms/NotificationPreferences';
import { Row, Col } from 'react-bootstrap';

import './myaccount.scss';

export interface ManageProfileProps {}

export const ManageProfile: React.FC<ManageProfileProps> = ({
  ...props
}) => {
  return (
    <div className="manage-profile">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Manage Profile</h1>
      </header>

        <Row>
          <Col lg={6}>
            <ChangePassword />
          </Col>

          <Col lg={6}>
            <NotificationPreferences />
          </Col>
        </Row>
    </div>
  );
};
