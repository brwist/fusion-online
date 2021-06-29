import React, {useState} from 'react'
import { Container, Col, Row } from 'react-bootstrap';

import { SectionHeader } from '../SectionHeader/SectionHeader';
import { MyAccountNav } from './MyAccountNav';
import { OrderDetails } from './OrderDetails';
import './myaccount.scss'

export interface AccountPageProps {
  signOut(): void
}

export const AccountPage: React.FC<AccountPageProps> = ({
  signOut
}) => {
  const [tabContent, setTabContent] = useState(<OrderDetails />)

  const updateTabContent = (Component: JSX.Element) => {
    setTabContent(Component)
  }

  return (
    <Container>
      <SectionHeader subheading="My Account" heading="Hello, Steve"/>
      <Row>
      <Col xs={2}>
        <MyAccountNav
          updateTabContent={updateTabContent}
          signOut={signOut}
        />
      </Col>
      <Col xs={10}>
        {tabContent}
      </Col>
      </Row>
    </Container>
  )
}