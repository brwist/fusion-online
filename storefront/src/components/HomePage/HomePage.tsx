import React from 'react';
import Container from 'react-bootstrap/Container'

import {Login} from '../Forms/Login';
import {Register} from '../Forms/Register';

export interface HomePageProps {
  handleSignIn(email: string, password: string): void,
  errors: any
}
export const HomePage: React.FC<HomePageProps> = ({ handleSignIn, errors}) => {
  return (
    <Container>
      <Login handleSignIn={handleSignIn} errors={errors}/>
      <Register />
    </Container>
  )
}