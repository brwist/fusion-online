import React from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap';

import { SectionHeader } from '../SectionHeader/SectionHeader';

import './registrationconfirmationpage.scss'

export interface RegistrationConfirmationPageProps {}

export const RegistrationConfirmationPage: React.FC<RegistrationConfirmationPageProps> = ({}) => {
  const history = useHistory()
  return (
    <Container>
      <SectionHeader subheading="Confirmation" heading="Thank you for registering"/>
      <h6>Please check your email to verify your account</h6>
      <Button onClick={() => history.push('/')}>Return to Home</Button>
    </Container>
  )
}