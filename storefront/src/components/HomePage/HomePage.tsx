import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Login } from '../Forms/Login';
import { Register } from '../Forms/Register';
import { Footer } from '../Footer/Footer';

import './homepage.scss';

export interface HomePageProps {
  handleSignIn(email: string, password: string): void,
  handleRegistration(email: string, password: string): Promise<{data: {}}>,
  errors: any
}
export const HomePage: React.FC<HomePageProps> = ({ handleSignIn, handleRegistration, errors }) => {
  return (
    <div className="home">
      <div className="hero">
        <Container>
          <Row>
            <Col md={6}>
              <div className="content">
                <h4 className="tagged">Lorem Ipsum Dolor</h4>
                <h1>Fusion Product Portal</h1>
              </div>
            </Col>
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
            <Login handleSignIn={handleSignIn} errors={errors} />
          </Col>
        </Row>

        <Register handleRegistration={handleRegistration} />
      </Container>

      <Footer />
    </div>
  )
}
