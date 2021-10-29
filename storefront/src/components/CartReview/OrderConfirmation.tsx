import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { SectionHeader } from '../SectionHeader/SectionHeader';

import { useHistory } from 'react-router-dom';

export const OrderConfirmation: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <SectionHeader subheading="Checkout" heading="Thank you for your order!" />
      <p>Lorem ipsum ...</p>
      <Button onClick={() => history.push('/')} variant="primary" size="lg">
        Return Home
      </Button>
    </Container>
  );
};
