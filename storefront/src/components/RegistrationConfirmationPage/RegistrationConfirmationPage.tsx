import React from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Button, Row } from 'react-bootstrap';

import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Footer } from '../Footer/Footer';

import './registrationconfirmationpage.scss'

export interface RegistrationConfirmationPageProps {}

export const RegistrationConfirmationPage: React.FC<RegistrationConfirmationPageProps> = ({}) => {
  const history = useHistory()
  return (
    <div className="home">
      <div className="hero">
        <Container>
          <Row>
            <SectionHeader subheading="Confirmation" heading="Thank you for registering" borderClass="" />
          </Row>
        </Container>
      </div>

      <Container className="content">
          <Row>
          <h4>Please check your email to verify your account</h4>
          </Row>
          <Row>
          <Button onClick={() => history.push('/')}>Return to Home</Button>
          </Row>
          </Container>
      <Footer />
    </div>
  )
}