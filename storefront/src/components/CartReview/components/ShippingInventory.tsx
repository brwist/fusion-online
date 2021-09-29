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
import { OrderSummary } from '../OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark, faChevronDown, faChevronUp, faTimes } from '@fortawesome/pro-regular-svg-icons';
// eslint-disable-next-line
import { faBookmark as fasFaBookmark, faEllipsisH } from '@fortawesome/pro-solid-svg-icons';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import { useQuery } from '@apollo/client';
import { GET_CART_PRODUCT_DETAILS } from '../../../config';

import '../cart.scss';

type CartProductDetailsQuery = {
  productVariants?: Maybe<{
    edges: Array<
      { __typename: 'ProductVariantCountableEdge' } & { node: Maybe<ProductVariant> & { product: Maybe<Product> } }
    >;
  }>;
};

export interface ShippingInventoryProps {
  items: any;
}

export const ShippingInventory: React.FC<ShippingInventoryProps> = ({ items }) => {
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
      <>
        <SectionHeader subheading="checkout" heading="Cart" />
        <h5>Your cart is empty.</h5>
      </>
    );
  } else if (items && data) {
    return (
      <>
        <Card>
          <div className="d-flex justify-content-between align-items-start">
            <Row className="mx-n1 small">
              <span className="px-1">
                PRODUCTS:
                {items?.length}
              </span>
              <span className="px-1">UNITS:</span>
              <span className="font-weight-bold px-1">
                {items?.reduce((acc: number, curr: { quantity: number }) => acc + curr.quantity, 0)}
              </span>
              <span className="px-1">SUBTOTAL:</span>
              <span className="font-weight-bold px-1">${calculateSubtotal()}</span>

              <Form.Group as={Row} controlId="deliver-to" className="small m-0" style={{ width: '45%' }}>
                <Form.Label column sm={3} className="col-form-label-sm font-weight-bold px-1">
                  Deliver to
                </Form.Label>
                <Col sm={9} className="px-0">
                  <Form.Control as="select" size="sm" custom readOnly={true}>
                    <option>123 Main St, Haverhill, MA 01835, USA</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Row>
          </div>
          <Table borderless striped responsive>
            <thead className="border-bottom">
              <tr>
                <th>Product Details</th>
                <th className="text-center">Available Quantity</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(
                (
                  { quantity, totalPrice, variant }: { quantity: number; totalPrice: number; variant: any },
                  index: number
                ) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="small">{variant.sku}</div>
                        {variant.product.name}
                      </td>
                      <td className="text-center font-weight-bold">{variant.quantityAvailable}</td>
                      <td className="text-center">{quantity}</td>

                      {variant.pricing?.onSale ? (
                        <td className="text-right">
                          <div className="small">
                            <s>${(variant.pricing?.priceUndiscounted?.gross.amount || 0)?.toFixed(2)}</s>
                          </div>
                          <div className="font-weight-bold text-primary">
                            ${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}
                          </div>
                        </td>
                      ) : (
                        <td className="text-right">${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}</td>
                      )}
                      <td className="text-right font-weight-bold">
                        ${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Card>
      </>
    );
  } else {
    return <h5>Loading Cart...</h5>;
  }
};
