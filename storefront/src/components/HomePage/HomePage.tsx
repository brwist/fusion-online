import React from 'react';
import Container from 'react-bootstrap/Container'

import {Login} from '../Forms/Login';
import {Register} from '../Forms/Register';

export interface HomePageProps {}
export const HomePage: React.FC<HomePageProps> = ({ ...props}) => {
  return (
    <Container>
      <Login/>
      <Register />
    </Container>
  )
}