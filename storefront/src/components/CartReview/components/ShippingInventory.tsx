import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import { useQuery } from '@apollo/client';
import { GET_CART_PRODUCT_DETAILS } from '../../../config';
import { GET_USER_ADDRESSES } from '../../../graphql/account';
import { User, Address } from '../../../generated/graphql';

import '../cart.scss';

const mockShippingMethods = [
  {
    carrier: 'FedEx',
    method: 'Ground',
    transit_time: '3 Day(s)',
    account: '0123456789',
  },
  {
    carrier: 'FedEx',
    method: 'Saver (3-Day Delivery)',
    transit_time: '3 Day(s)',
    account: '0123456789',
  },
  {
    carrier: 'FedEx',
    method: 'Economy (2nd Day Air)',
    transit_time: '2 Day(s)',
    account: '0123456789',
  },
  {
    carrier: 'FedEx',
    method: 'Overnight PM Delivery',
    transit_time: '1 Day(s)',
    account: '0123456789',
  },
];

type CartProductDetailsQuery = {
  productVariants?: Maybe<{
    edges: Array<
      { __typename: 'ProductVariantCountableEdge' } & { node: Maybe<ProductVariant> & { product: Maybe<Product> } }
    >;
  }>;
};

type userAddressesQuery = {
  me: User & { addresses: Array<Address> };
};

export interface ShippingInventoryProps {
  items: any;
}

export const ShippingInventory: React.FC<ShippingInventoryProps> = ({ items }) => {
  const [quantityField, setQuantityField]: any = useState();
  const addressQuery = useQuery<userAddressesQuery>(GET_USER_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  console.log('addressQuery: ', addressQuery);

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

  if (!items || items?.length === 0) {
    return (
      <>
        <SectionHeader subheading="checkout" heading="Cart" />
        <h5>Your cart is empty.</h5>
      </>
    );
  } else if (items && data) {
    console.log('items: ', items);
    console.log('data: ', data);
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
          <div className="d-flex justify-content-between align-items-start">Shipment Inventory</div>
          <Table borderless striped responsive>
            <thead className="border-bottom">
              <tr>
                <th>Product Details</th>
                <th>Available Quantity</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Price</th>
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
          <div className="d-flex justify-content-between align-items-start">Shipping Address</div>
          <Table borderless striped responsive>
            <thead className="border-bottom">
              <tr>
                <th></th>
                <th className="text-center">Name / Company</th>
                <th className="text-center">Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {addressQuery?.data?.me.addresses.map((address, index: number) => {
                console.log('address: ', address);
                return (
                  <tr key={index}>
                    <td>
                      <input type="radio" defaultChecked={index === 0} onChange={() => setSelectedAddress(address)} />
                    </td>
                    <td>
                      <div>
                        Johnny Howell
                        <br />
                        36 Creative
                      </div>
                    </td>
                    <td>
                      123 Turkey Street
                      <br />
                      Haverhill, MA 01835
                      <br />
                      USA
                    </td>
                    <td>{index === 0 && `Default`}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          Deliver By <Button variant="link">Set a delivery date</Button>
          <div className="d-flex justify-content-between align-items-start">Domestic Shipping Method</div>
          <Table borderless striped responsive>
            <thead className="border-bottom">
              <tr>
                <th></th>
                <th>Carrier</th>
                <th>Method</th>
                <th>Estimated Transit</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {mockShippingMethods.map((shippingMethod, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="radio"
                        defaultChecked={index === 0}
                        onChange={() => setSelectedShippingMethod(shippingMethod)}
                      />
                    </td>
                    <td>{shippingMethod.carrier}</td>
                    <td>{shippingMethod.method}</td>
                    <td>{shippingMethod.transit_time}</td>
                    <td>{shippingMethod.account}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button>Continue to Payment</Button>
        </Card>
      </>
    );
  } else {
    return <h5>Loading Cart...</h5>;
  }
};
