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

import { ShippingInventory } from './components/ShippingInventory';
import { Payment } from './components/Payment';
import { Agreement } from './components/Agreement';
import { Notes } from './components/Notes';

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
  shippingPrice: any;
  subtotalPrice: any;
  totalPrice: any;
  updateItem: any;
  subtractItem: any;
}

export const CartReview: React.FC<CartProps> = ({
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
        <SectionHeader subheading="checkout" heading="Review Order" />
        <div className="cart">
          <Row>
            <Col lg={9}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    Shipping
                    <ContextAwareToggle eventKey="0" />
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <ShippingInventory items={items} />
                  </Accordion.Collapse>

                  <Card.Header>
                    Payment
                    <ContextAwareToggle eventKey="1" />
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Payment />
                  </Accordion.Collapse>

                  <Card.Header>
                    Agreement
                    <ContextAwareToggle eventKey="2" />
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Agreement />
                  </Accordion.Collapse>

                  <Card.Header>
                    Notes
                    <ContextAwareToggle eventKey="3" />
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Notes />
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button>Place Your Order</Button>
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
