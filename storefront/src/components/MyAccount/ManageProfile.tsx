import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { ChangePassword } from '../Forms/ChangePassword';
import { NotificationPreferences} from '../Forms/NotificationPreferences';
import { usePasswordChange } from "@saleor/sdk";

import './myaccount.scss';

export interface ManageProfileProps {}

export const ManageProfile: React.FC<ManageProfileProps> = ({
  ...props
}) => {
  const [setPasswordChange, { data, error }] = usePasswordChange();

  return (
    <div className="manage-profile">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Manage Profile</h1>
      </header>
      <Row>
        <Col lg={6}>
          <ChangePassword setPasswordChange={setPasswordChange} error={error ? error!.extraInfo!.userInputErrors : []}/>
        </Col>
        <Col lg={6}>
          <NotificationPreferences />
        </Col>
      </Row>
    </div>
  )
}
