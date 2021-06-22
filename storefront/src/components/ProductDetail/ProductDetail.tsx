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
        <header className="my-5 pb-4 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <a href="#">GO BACK</a>
            <h1 className="my-3">Intel<sup>®</sup> Pentium<sup>®</sup> Gold 7505 Processor</h1>
            <div className="small">
              <svg className="mr-1" width="52px" height="15px" viewBox="0 0 52 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>demand-scale</title>
                <g id="Member" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Components" transform="translate(-160.000000, -2982.000000)" fill="#DDDDDD">
                    <g id="CPU---Single-Order" transform="translate(160.000000, 2894.000000)">
                      <g id="demand-scale" transform="translate(0.000000, 88.000000)">
                        <polygon className="active" id="Rectangle1" points="8.37051392 0 15.3705139 0 7 14.2763062 1.00255103e-14 14.2763062"></polygon>
                        <polygon className="active" id="Rectangle2" points="17.3705139 0 24.3705139 0 16 14.2763062 9 14.2763062"></polygon>
                        <polygon className="active" id="Rectangle3" points="26.3705139 0 33.3705139 0 25 14.2763062 18 14.2763062"></polygon>
                        <polygon className="active" id="Rectangle4" points="35.3705139 0 42.3705139 0 34 14.2763062 27 14.2763062"></polygon>
                        <polygon className="" id="Rectangle5" points="44.3705139 0 51.3705139 0 43 14.2763062 36 14.2763062"></polygon>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              High Demand
            </div>
          </div>
          <Button variant="primary">
            <FontAwesomeIcon icon={farFaBookmark} className="mr-1" /> Add to List
          </Button>
        </header>

        <Row className="justify-content-between">
          <Col lg={6}>
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
              <div className="packaging-options mt-2">
                <Button variant="primary">
                  Packaging Option 1<br />
                  $00.00
                </Button>
                <Button variant="outline-dark">
                  Packaging Option 2<br />
                  $00.00
                </Button>
                <Button variant="outline-dark">
                  Packaging Option 3<br />
                  $00.00
                </Button>
              </div>
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
