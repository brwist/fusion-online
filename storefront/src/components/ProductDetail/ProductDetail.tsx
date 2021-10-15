import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { AddToCart } from '../AddToCart/AddToCart';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
// eslint-disable-next-line
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';
import { Maybe, Product } from '../../generated/graphql';
import { ItemAddedAlert } from '../AddToCart/ItemAddedAlert';
import { ScrollToTopOnMount } from '../../utils/ScrollToTopOnMount';
import { Carousel } from 'react-responsive-carousel';

import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../config';

import Img from '../../img/logo-mark.png';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productdetail.scss';

export interface ProductDetailProps {
  addItem: any
}

type ProductDetailsQuery = {
  product?: Maybe<Product>
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  addItem
}) => {
  const { slug } = useParams<{slug: string}>();
  const history = useHistory();
  const { data } = useQuery<ProductDetailsQuery>(GET_PRODUCT_DETAILS, {variables: {slug: slug}});
  const [ showAlert, setShowAlert ] = useState(false);
  const [ selectedQuantity, setSelectedQuantity ] = useState(1);

  return (
    <>
    <ScrollToTopOnMount />
    <ItemAddedAlert
      productName={data?.product?.name || "Item"}
      quantity={selectedQuantity}
      show={showAlert}
      hideAlert={() => setShowAlert(false)}
    />
    <Container className="product-detail" onClick={() => showAlert && setShowAlert(false)}>
      <Button variant="link" className="btn-go-back mb-4" onClick={() => history.goBack()}>GO BACK</Button>

      <Row>
        <Col lg={4}>
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            thumbWidth={50}
          >
            <div>
              <img
                src={Img}
                alt="RocketChips"
              />
            </div>
            <div>
              <img
                src={Img}
                alt="RocketChips"
              />
            </div>
            <div>
              <img
                src={Img}
                alt="RocketChips"
              />
            </div>
            <div>
              <img
                src={Img}
                alt="RocketChips"
              />
            </div>
            <div>
              <img
                src={Img}
                alt="RocketChips"
              />
            </div>
          </Carousel>
        </Col>
        <Col lg={8}>
          <header className="mb-5 pb-4 border-bottom d-flex justify-content-between align-items-center">
            <div>
              <h1 className="my-3">{data?.product?.name}</h1>
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

          <div className="border-bottom mb-4">
            <Row>
              {data?.product?.attributes.map(({attribute, values}) => {
                return (
                  <Col lg={5}>
                    <Row className="mb-4" key={attribute.id}>
                      <Col className="text-right font-weight-bold">
                        {attribute.name}
                      </Col>
                      <Col>
                          {values[0]?.name}
                      </Col>
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </div>

          <div className="mb-5">
            <span className="font-weight-bold">Offers:</span> Offer 1
            <Row className="offer-options mt-2 mx-n1">
              <Col lg={3} className="p-1">
                <Button variant="primary" block>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">Offer 1</span>
                    <span>$00.00</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>COO</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Ships From</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Lead Time</span>
                    <span className="font-weight-bold">2 days</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Units Available</span>
                    <span className="font-weight-bold">3</span>
                  </div>
                </Button>
              </Col>
              <Col lg={3} className="p-1">
                <Button variant="outline-dark" block>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">Offer 2</span>
                    <span>$00.00</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>COO</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Ships From</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Lead Time</span>
                    <span className="font-weight-bold">2 days</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Units Available</span>
                    <span className="font-weight-bold">3</span>
                  </div>
                </Button>
              </Col>
              <Col lg={3} className="p-1">
                <Button variant="outline-dark" block>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">Offer 3</span>
                    <span>$00.00</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>COO</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Ships From</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Lead Time</span>
                    <span className="font-weight-bold">2 days</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Units Available</span>
                    <span className="font-weight-bold">3</span>
                  </div>
                </Button>
              </Col>
              <Col lg={3} className="p-1">
                <Button variant="outline-dark" block>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">Offer 4</span>
                    <span>$00.00</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>COO</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Ships From</span>
                    <span className="font-weight-bold">United States</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Lead Time</span>
                    <span className="font-weight-bold">2 days</span>
                  </div>
                  <div className="small d-flex justify-content-between">
                    <span>Units Available</span>
                    <span className="font-weight-bold">3</span>
                  </div>
                </Button>
              </Col>
            </Row>
          </div>

          <AddToCart
            variant={data?.product?.variants && data?.product?.variants[0]}
            addItem={addItem}
            updateQuantity={(quantity: number) => setSelectedQuantity(quantity)}
            showItemAddedAlert={() => setShowAlert(true)}
          />
        </Col>
      </Row>

      <Tabs defaultActiveKey="specs" className="mt-5">
        <Tab eventKey="specs" title="Technical Specs">
          <Row>
            {data?.product?.attributes.map(({attribute, values}) => {
              return (
                <Col lg={6}>
                  <Row className="mb-4" key={attribute.id}>
                    <Col className="font-weight-bold">
                      {attribute.name}
                    </Col>
                    <Col>
                      {values[0]?.name}
                    </Col>
                  </Row>
                </Col>
              )
            })}
          </Row>
        </Tab>
        <Tab eventKey="insight" title="Market Insight">
          <div className="font-weight-bold">Market Insight</div>
          {(data?.product?.metadata.find(item => item?.key === "market_insight"))?.value}
        </Tab>
      </Tabs>
    </Container>
    </>
  );
};
