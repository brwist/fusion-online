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

import './cart-review.scss';

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
      <Button variant="link" className="p-0" onClick={decoratedOnClick}>
        <FontAwesomeIcon icon={isCurrentEventKey ? faChevronDown : faChevronUp} size="lg" />
      </Button>
    );
  }

  const [quantityField, setQuantityField]: any = useState();
  const [activeTab, setActiveTab] = useState('shipping');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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
        <SectionHeader subheading="checkout" heading="Review &amp; Place Your Order" />
        <div className="cart-review">
          <Row>
            <Col lg={9}>
              {/* <Accordion defaultActiveKey="0"> */}
              <Accordion activeKey={activeTab}>
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0 text-capitalize">
                        Shipping <small className="text-muted">Step 1</small>
                      </h5>
                      <ContextAwareToggle eventKey="shipping" callback={() => setActiveTab('shipping')} />
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="shipping">
                    <ShippingInventory items={items} setActiveTab={setActiveTab} />
                  </Accordion.Collapse>

                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0 text-capitalize">
                        Payment <small className="text-muted">Step 2</small>
                      </h5>
                      <ContextAwareToggle eventKey="payment" callback={() => setActiveTab('payment')} />
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="payment">
                    <Payment setSelectedPaymentMethod={setSelectedPaymentMethod} setActiveTab={setActiveTab} />
                  </Accordion.Collapse>

                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0 text-capitalize">
                        Agreement <small className="text-muted">Step 3</small>
                      </h5>
                      <ContextAwareToggle eventKey="agreement" callback={() => setActiveTab('agreement')} />
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="agreement">
                    <Agreement />
                  </Accordion.Collapse>

                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0 text-capitalize">
                        Notes <small className="text-muted">Step 4</small>
                      </h5>
                      <ContextAwareToggle eventKey="notes" callback={() => setActiveTab('notes')} />
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="notes">
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
