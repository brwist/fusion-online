import React from 'react';
import { useHistory, Link, useLocation, useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
// eslint-disable-next-line
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';
import {useUserOrderByTokenQuery} from '../../graphql/account'
import manufacturers from '../../utils/manufacturers.json'

import './myaccount.scss';

export interface OrderDetailsProps {}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  ...props
}) => {
  const history = useHistory()
  const location = useLocation()
  const getAllOrdersPath = () => {
    const path = location.pathname.split('/')
    path.pop()
    return path.join("/")
  }
  const {id} = useParams<{id: string}>()
  const {data} = useUserOrderByTokenQuery({variables: {token: id}})
  console.log("order details", data)
  const getMetadataValue = (key, product) => product.metadata?.find(pair => pair.key === key)?.value

  return (
    <div className="order-details">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <div>
          <Button variant="link" className="btn-see-all" onClick={() => history.push(getAllOrdersPath())}>SEE ALL ORDERS</Button>
          <h2 className="h3 mt-1 mb-0">Order Details</h2>
        </div>
        <Button variant="primary" disabled>
          Download Invoice
        </Button>
      </header>

      <Card>
        <Card.Body>
          <Row>
            <Col lg={4} className="small">
              <strong>Order Number:</strong> {data?.orderByToken?.number}
            </Col>
            <Col lg={4} className="small">
              <strong>Purchase Date:</strong> {moment(data?.orderByToken?.created).format('MMM DD, YYYY')}
            </Col>
            <Col lg={4} className="small text-right">
              <strong>Total:</strong> ${data?.orderByToken?.total?.gross.amount}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Subtitle as="h6" className="mb-4">Payment Method: Credit Card</Card.Subtitle>

          <Row>
            <Col lg={4} className="small">
              {data?.orderByToken?.payments && data?.orderByToken?.payments[0]?.creditCard?.brand}<br />
              ****{data?.orderByToken?.payments && data?.orderByToken?.payments[0]?.creditCard?.lastDigits}
            </Col>
            <Col lg={4}>
              {data?.orderByToken?.billingAddress?.firstName} {data?.orderByToken?.billingAddress?.lastName}<br />
              {data?.orderByToken?.billingAddress?.streetAddress1} {data?.orderByToken?.billingAddress?.streetAddress2}<br />
              {data?.orderByToken?.billingAddress?.city}, {data?.orderByToken?.billingAddress?.countryArea} {data?.orderByToken?.billingAddress?.postalCode}, {data?.orderByToken?.billingAddress?.country.code}
            </Col>
            <Col lg={4}>
              <Row>
                <Col>
                  Product Total
                </Col>
                <Col className="text-right">
                  ${data?.orderByToken?.subtotal?.gross.amount}
                </Col>
              </Row>
              <Row>
                <Col>
                  Shipping
                </Col>
                <Col className="text-right">
                  ${(data?.orderByToken?.shippingPrice?.gross.amount)?.toFixed(2)}
                </Col>
              </Row>
              <Row>
                <Col>
                  Sales, Tax, Fees &amp; Surcharges
                </Col>
                <Col className="text-right">
                  $00.00
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Order Total</strong>
                </Col>
                <Col className="text-right">
                  <strong>${data?.orderByToken?.total?.gross.amount}</strong>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Subtitle as="h6" className="mb-4">Shipment</Card.Subtitle>

          <Row>
            <Col lg={4}>
              <div className="font-weight-bold small">
                Ship Date:
              </div>
              {data?.orderByToken?.status === 'FULFILLED' ?
                moment(data?.orderByToken?.fulfillments[0]?.created).format('MMM DD, YYYY') :
                data?.orderByToken?.statusDisplay
              }
            </Col>
            <Col lg={4}>
              <div className="font-weight-bold small">
                Shipping Address
              </div>
              {data?.orderByToken?.shippingAddress?.firstName} {data?.orderByToken?.shippingAddress?.lastName}<br />
              {data?.orderByToken?.shippingAddress?.streetAddress1} {data?.orderByToken?.shippingAddress?.streetAddress2}<br />
              {data?.orderByToken?.shippingAddress?.city}, {data?.orderByToken?.shippingAddress?.countryArea} {data?.orderByToken?.shippingAddress?.postalCode}, {data?.orderByToken?.shippingAddress?.country.code}
            </Col>
            <Col lg={4} className="text-right">
              <Button variant="primary" disabled>
                Track Package
              </Button>
            </Col>
          </Row>

          <hr />
            {data?.orderByToken?.lines.map((line) => {
                const mcode = getMetadataValue("mcode", line?.variant.product)
                const manufacturer = manufacturers.find(m => m.mcode === mcode)?.manufacturer
              return (
                <Row key={line?.id} className="mb-5">
                  <Col lg={4}>
                    <div className="small">
                      <strong className="text-uppercase">{manufacturer}</strong> {line?.productSku}
                    </div>
                    <Link to={`/products/${line?.variant?.id}`}>{line?.productName}</Link>
                    <div className="small mt-1">
                      Spec Code: {line?.variant?.product?.attributes?.find(({attribute}) => attribute.slug === 'spec-code')
                        ?.values[0]?.name
                      } | Ordering Code: {line?.variant?.product?.attributes?.find(({attribute}) => attribute.slug === 'ordering-code')
                        ?.values[0]?.name
                      }
                    </div>
                    <div className="small">
                      CIPN: AB1234567
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="font-weight-bold small">
                      Per Unit Price
                    </div>
                    <div>
                      <strong className="text-primary">${line?.unitPrice?.gross.amount}</strong>/unit
                    </div>
                  </Col>
                  <Col lg={1} className="text-center">
                    <div className="font-weight-bold small">
                      Qty
                    </div>
                    {line?.quantity}
                  </Col>
                  <Col lg={3} className="text-right">
                    <div className="font-weight-bold small">
                      Product Total
                    </div>
                    ${line?.totalPrice?.gross.amount}
                  </Col>
                  <Col lg={1} className="text-right">
                    <FontAwesomeIcon icon={farFaBookmark} />
                  </Col>
                </Row>
              )
            })}
          <hr />

          <div className="font-weight-bold small">
            Notes
          </div>
          <div>
            <em>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at tempor. Faucibus vitae aliquet nec.</em>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
