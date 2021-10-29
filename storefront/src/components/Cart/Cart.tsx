import React, { useContext, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Accordion,
  Card,
  Button,
  Table,
  Form,
  useAccordionToggle,
  AccordionContext,
  Container,
  Dropdown,
} from 'react-bootstrap';
import { OrderSummary } from './OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark, faChevronDown, faChevronUp, faTimes } from '@fortawesome/pro-regular-svg-icons';
// eslint-disable-next-line
import { faBookmark as fasFaBookmark, faEllipsisH } from '@fortawesome/pro-solid-svg-icons';
import { Maybe, Product, ProductVariant } from '../../generated/graphql';
import { SectionHeader } from '../SectionHeader/SectionHeader';

import { useQuery } from '@apollo/client';
import { GET_CART_PRODUCT_DETAILS } from '../../config';

import './cart.scss';
import { ICheckoutModelPriceValue } from '@saleor/sdk/lib/helpers';

type CartProductDetailsQuery = {
  productVariants?: Maybe<{
    edges: Array<
      { __typename: 'ProductVariantCountableEdge' } & { node: Maybe<ProductVariant> & { product: Maybe<Product> } }
    >;
  }>;
};

export interface CartProps {
  discount: any;
  items: any;
  removeItem: any;
  shippingPrice: ICheckoutModelPriceValue;
  subtotalPrice: any;
  totalPrice: any;
  updateItem: any;
  subtractItem: any;
}

export const Cart: React.FC<CartProps> = ({
  discount,
  items,
  removeItem,
  shippingPrice,
  subtotalPrice,
  totalPrice,
  updateItem,
  subtractItem,
}) => {
  function ContextAwareToggle({ eventKey, callback }: any) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <Button variant="link" className="py-0 pl-0 pr-3" onClick={decoratedOnClick}>
        <FontAwesomeIcon icon={isCurrentEventKey ? faChevronDown : faChevronUp} size="lg" />
      </Button>
    );
  }

  const [quantityField, setQuantityField]: any = useState();

  useEffect(() => {
    if (items) {
      const fields: any = {};
      items.forEach(({ variant, quantity }: any) => {
        fields[`${variant.id}`] = quantity;
      });
      setQuantityField(fields);
    }
  }, [items]);

  const { data } = useQuery<CartProductDetailsQuery>(GET_CART_PRODUCT_DETAILS, {
    variables: {
      first: 100,
      ids: items?.map(({ variant }: any) => variant.id),
    },
  });

  const calculateSubtotal = () => {
    return data?.productVariants?.edges
      .reduce((acc, curr) => {
        const currPrice = curr.node.pricing?.price?.gross?.amount || 0;
        const currQuantity = items?.find((item: any) => curr.node.id === item.variant.id)?.quantity || 0;
        return acc + currPrice * currQuantity;
      }, 0)
      ?.toFixed(2);
  };

  const getAttributeValue = (slugName: string, attributes: any): any => {
    const matchingAttribute = attributes.filter(({ attribute }: any) => attribute.slug === slugName);
    return matchingAttribute[0] && matchingAttribute[0].values[0]?.name;
  };

  if (!items || items?.length === 0) {
    return (
      <Container>
        <SectionHeader subheading="checkout" heading="Cart" />
        <h5>Your cart is empty.</h5>
      </Container>
    );
  } else if (items && data) {
    return (
      <Container>
        <SectionHeader subheading="checkout" heading="Cart" />
        <div className="cart">
          <header>
            <Button variant="link">
              <FontAwesomeIcon icon={farFaBookmark} size="lg" className="mr-1" /> Move All to Parts List
            </Button>
            <Button
              variant="link"
              className="text-danger"
              onClick={() => items.forEach((item: { variant: { id: string } }) => removeItem(item.variant.id))}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" className="mr-1 text-danger" /> Remove All
            </Button>
          </header>

          <Row>
            <Col lg={9}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="w-25 d-flex align-items-start">
                        <ContextAwareToggle eventKey="0" />

                        <div className="w-100">
                          <h5 className="text-capitalize">Shipment</h5>

                          <Row className="mx-n1 small">
                            <Col sm={6} className="px-1">
                              PRODUCTS:
                            </Col>
                            <Col sm={6} className="font-weight-bold px-1">
                              {items?.length}
                            </Col>
                          </Row>
                          <Row className="mx-n1 small">
                            <Col sm={6} className="px-1">
                              UNITS:
                            </Col>
                            <Col sm={6} className="font-weight-bold px-1">
                              {items?.reduce((acc: number, curr: { quantity: number }) => acc + curr.quantity, 0)}
                            </Col>
                          </Row>
                          <Row className="mx-n1 small">
                            <Col sm={6} className="px-1">
                              SUBTOTAL:
                            </Col>
                            <Col sm={6} className="font-weight-bold px-1">
                              ${calculateSubtotal()}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Card.Header>

                  <Accordion.Collapse eventKey="0">
                    <Table borderless striped responsive>
                      <thead className="border-bottom">
                        <tr>
                          <th className="text-center">Save</th>
                          <th>Product Details</th>
                          <th className="text-center">Qty Available</th>
                          <th className="text-center">Qty</th>
                          <th className="text-right">Unit Price</th>
                          <th className="text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.productVariants?.edges?.map(
                          ({ node: { id, name, sku, quantityAvailable, product, price, pricing } }) => {
                            const quantitySelected = items?.find((item: any) => item.variant.id === id).quantity || 1;
                            return (
                              <tr key={id}>
                                <td className="text-center">
                                  <FontAwesomeIcon icon={farFaBookmark} />
                                </td>
                                <td>
                                  <div className="small">
                                    <strong className="text-uppercase">
                                      {getAttributeValue('manufacturer', product?.attributes)}
                                    </strong>{' '}
                                    {sku}
                                  </div>
                                  <a href={`/products/${product.slug}`}>{product.name}</a>
                                  <div className="small mt-1">
                                    Spec Code: {getAttributeValue('spec-code', product?.attributes)} | Ordering Code:{' '}
                                    {getAttributeValue('ordering-code', product?.attributes)}
                                  </div>
                                </td>
                                <td className="text-center font-weight-bold">{quantityAvailable}</td>
                                <td className="text-center">
                                  <Form.Row className="align-items-center">
                                    <Col sm={6}>
                                      <Form.Group controlId="qty-1" className="m-0">
                                        <Form.Label className="sr-only">Qty</Form.Label>
                                        <Form.Control
                                          style={{ width: '70px' }}
                                          size="sm"
                                          type="number"
                                          min={1}
                                          max={quantityAvailable}
                                          name={id}
                                          onChange={(e) => {
                                            if (parseInt(e.target.value) > 0) {
                                              updateItem(id, parseInt(e.target.value));
                                            } else {
                                              setQuantityField({
                                                ...quantityField,
                                                [e.target.name]: e.target.value,
                                              });
                                            }
                                          }}
                                          value={quantityField ? quantityField[id] : 1}
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={12} lg={6} className="p-0">
                                        <Button variant="link" className="small p-0 text-danger" onClick={() => removeItem(id)}>
                                          Remove
                                        </Button>
                                    </Col>
                                  </Form.Row>
                                </td>

                                {pricing?.onSale ? (
                                  <td className="text-right">
                                    <div className="small">
                                      <s>${(pricing?.priceUndiscounted?.gross.amount || 0)?.toFixed(2)}</s>
                                    </div>
                                    <div className="font-weight-bold text-primary">
                                      ${(pricing?.price?.gross.amount || 0).toFixed(2)}
                                    </div>
                                  </td>
                                ) : (
                                  <td className="text-right">${(pricing?.price?.gross.amount || 0).toFixed(2)}</td>
                                )}
                                <td className="text-right font-weight-bold">
                                  ${(quantitySelected * (pricing?.price?.gross.amount || 0)).toFixed(2)}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="border-top">
                          <td colSpan={4}></td>
                          <td className="text-right">Subtotal</td>
                          <td className="font-weight-bold text-right">${calculateSubtotal()}</td>
                        </tr>
                      </tfoot>
                    </Table>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>

            <Col lg={3}>
              <OrderSummary subtotal={calculateSubtotal() || 0} />
            </Col>
          </Row>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <h5>Loading Cart...</h5>
      </Container>
    );
  }
};
