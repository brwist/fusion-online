import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { ChangePassword } from '../Forms/ChangePassword';
import { NotificationPreferences} from '../Forms/NotificationPreferences';
import { usePasswordChange } from "@saleor/sdk";

export interface ManageProfileProps {}

export const ManageProfile: React.FC<ManageProfileProps> = ({
  ...props
}) => {
  const [feedback, setFeedback] = useState(<></>)
  const [setPasswordChange, { data, error }] = usePasswordChange();


  // if (data) {
  //   setFeedback(<p className="text-success">Your password has been changed.</p>)
  // } else if (error) {
  //   setFeedback(<p className="text-danger">{error.message}</p>)
  // } else {
  //   setFeedback(<></>)
  // }
  
  return (
    <Container>
      <Row>
        <Col>
        {feedback}
          <ChangePassword setPasswordChange={setPasswordChange}/>
        </Col>
        <Col>
          <NotificationPreferences />
        </Col>
      </Row>
    </Container>
  )
}