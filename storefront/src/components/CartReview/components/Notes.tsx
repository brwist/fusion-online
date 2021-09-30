import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import '../cart.scss';

export const Notes = () => {
  return (
    <>
      <Card>
        <Form.Group>
          <Form.Label>Do you have any specific notes for this order?</Form.Label>
          <textarea name="notes" rows={10} />
        </Form.Group>
      </Card>
    </>
  );
};
