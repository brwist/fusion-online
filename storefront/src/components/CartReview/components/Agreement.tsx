import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

export const Agreement = ({ setActiveTab, agreed, setAgreed }) => {
  return (
    <Card.Body>
      <Form.Group>
        <Form.Check
          custom
          type="checkbox"
          name="i-agree"
          id="i-agree"
          label="I understand and agree that by checking this box, this order is non-cancelable/non-returnable in accordance
          with standard terms and conditions for Fusion Worldwide customers"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
      </Form.Group>
    </Card.Body>
  );
};
