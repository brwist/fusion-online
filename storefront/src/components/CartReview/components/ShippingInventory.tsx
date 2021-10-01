import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import { useQuery } from '@apollo/client';
import { GET_CART_PRODUCT_DETAILS } from '../../../config';
import { GET_USER_ADDRESSES } from '../../../graphql/account';
import { User, Address } from '../../../generated/graphql';

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
      <Card.Body>
        <Row className="mx-n1 mb-4 small">
          <Col lg={2} className="px-1">
            <h6 className="m-0">Shipment 1</h6>
          </Col>
          <Col lg={2} className="px-1">
            <span>PRODUCTS:</span>
            <span className="font-weight-bold px-1">{items?.length}</span>
          </Col>
          <Col lg={2} className="px-1">
            <span>UNITS:</span>
            <span className="font-weight-bold px-1">
              {items?.reduce((acc: number, curr: { quantity: number }) => acc + curr.quantity, 0)}
            </span>
          </Col>
          <Col lg={2} className="px-1">
            <span>SUBTOTAL:</span>
            <span className="font-weight-bold px-1">${calculateSubtotal()}</span>
          </Col>
          <Col lg={4} className="px-1">
            <div>DELIVERY TO:</div>
            <span className="font-weight-bold">123 Main St, Haverhill, MA 01835, USA</span>
          </Col>
        </Row>
        <h5>Shipment Inventory</h5>
        <Table
          className="mb-4"
          borderless
          striped
          responsive
        >
          <thead className="border-bottom">
            <tr>
              <th>Product Details</th>
              <th className="text-right">Available Quantity</th>
              <th className="text-right">Quantity</th>
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
                    <td className="text-right">{variant.quantityAvailable}</td>
                    <td className="text-right">{quantity}</td>

                    {variant.pricing?.onSale ? (
                      <td className="text-right">
                        <div className="small">
                          ${(variant.pricing?.priceUndiscounted?.gross.amount || 0)?.toFixed(2)}
                        </div>
                        <div className="font-weight-bold text-primary">
                          ${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}
                        </div>
                      </td>
                    ) : (
                      <td className="text-right font-weight-bold">${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}</td>
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
        <h5>Shipping Address</h5>
        <Table
          className="mb-4"
          borderless
          striped
          responsive
        >
          <thead className="border-bottom">
            <tr>
              <th></th>
              <th>Name / Company</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {addressQuery?.data?.me.addresses.map((address, index: number) => {
              console.log('address: ', address);
              return (
                <tr key={index}>
                  <td>
                    <Form.Check
                      custom
                      type="radio"
                      name="shippingAddress"
                      defaultChecked={index === 0}
                      onChange={() => setSelectedAddress(address)}
                    />
                  </td>
                  <td>
                    Johnny Howell
                    <br />
                    36 Creative
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
        <div className="mb-4">
          Deliver By <Button variant="link">Set a delivery date</Button>
        </div>
        <h5>Domestic Shipping Method</h5>
        <Table
          className="mb-4"
          borderless
          striped
          responsive
        >
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
                    <Form.Check
                      custom
                      type="radio"
                      name="shippingMethod"
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
      </Card.Body>
    );
  } else {
    return <h5>Loading Cart...</h5>;
  }
};
