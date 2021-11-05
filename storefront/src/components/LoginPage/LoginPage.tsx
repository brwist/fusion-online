import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Login } from '../Forms/Login';
import { Register } from '../Forms/Register';
import { Footer } from '../Footer/Footer';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import './loginpage.scss';

export interface LoginPageProps {
  handleSignIn(email: string, password: string): void,
  handleRegistration(email: string, password: string): Promise<{data: {}}>,
  errors: any,
  setLandingPageAlert(alertInfo: {show: boolean, message: string, variant: string}): void
}
export const LoginPage: React.FC<LoginPageProps> = ({ 
  handleSignIn,
  handleRegistration,
  errors,
  setLandingPageAlert
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="home">
      <div className="hero">
        <Container>
          <Row>
            <SectionHeader subheading="Welcome" heading="RocketChips Product Portal" borderClass="" />
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="sign-in">
          <Col md={8} className="content">
            <Row>
              <Col md={6}>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
              </Col>
            </Row>

            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum. Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Sed tempus urna et pharetra pharetra.</p>
          </Col>
          <Col md={4}>
            <Login handleSignIn={handleSignIn} openModal={() => setShowModal(true)} errors={errors} />
            <ForgotPasswordModal setLandingPageAlert={setLandingPageAlert} show={showModal} handleClose={() => setShowModal(false)}/>
          </Col>
        </Row>

        <Register handleRegistration={handleRegistration} />
      </Container>

      <Footer />
    </div>
  )
}
