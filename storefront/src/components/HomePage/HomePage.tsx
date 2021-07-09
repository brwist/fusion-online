import React from 'react';
import { Container } from 'react-bootstrap';

export interface HomePageProps {

}
export const HomePage: React.FC<HomePageProps> = ({...props}) => {
  return (
    <Container>
      <h1>Home Page</h1>
    </Container>
  )
}