import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import '../cart.scss';

export const Agreement = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <>
      <Card>
        <Form.Group>
          <Form.Check type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
          <Form.Label>
            I understand and agree that by checking this box, this order is non-cancelable/non-returnable in accordance
            with standard terms and conditions for Fusion Worldwide customers
          </Form.Label>
        </Form.Group>
      </Card>
    </>
  );
};
