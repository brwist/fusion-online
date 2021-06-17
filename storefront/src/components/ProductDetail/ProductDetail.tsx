import React from 'react';
import { AddToCart } from '../AddToCart/AddToCart';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import './productdetail.scss';

export interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  ...props
}) => {
  return (
    <div className="product-detail">
      <Container>
        <header className="mb-5 d-flex justify-content-between align-items-center">
          <h1 className="m-0">Intel<sup>®</sup> Pentium<sup>®</sup> Gold 7505 Processor</h1>
          <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={farFaBookmark} className="mr-1" /> Add to List
          </Button>
        </header>

        <Row className="justify-content-between">
          <Col lg={5}>
            <div className="mb-4">
              <div className="font-weight-bold">INTEL</div>
              Model No: 123456789
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Family</div>
              Pentium
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Type</div>
              Desktop
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Spec Code</div>
              123456789
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Ordering Code</div>
              123456789
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Packaging</div>
              Packaging Option 1
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Country of Origin</div>
              United States
            </div>
            <div className="mb-4">
              <div className="font-weight-bold">Market Insight</div>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec ullamcorper sit amet risus. Ipsum dolor sit amet consectetur adipiscing elit. Quam id leo in vitae turpis massa sed elementum.
            </div>
          </Col>
          <Col lg={4}>
            <AddToCart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
