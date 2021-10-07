import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

export const Notes = () => {
  return (
    <Card.Body>
      <Form.Group>
        <Form.Label>Do you have any specific notes for this order?</Form.Label>
        <Form.Control as="textarea" name="notes" rows={10} />
      </Form.Group>
    </Card.Body>
  );
};
