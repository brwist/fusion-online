import React, { useState, useEffect } from 'react';
import { useCheckout, useAuth } from '@saleor/sdk';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { Maybe, Product, ProductVariant } from '../../../generated/graphql';
import { SectionHeader } from '../../SectionHeader/SectionHeader';

import { GET_CART_PRODUCT_DETAILS } from '../../../config';
import { GET_USER_ADDRESSES } from '../../../graphql/account';
import { USER_CHECKOUT_DETAILS } from '../../../graphql/user_checkout_details';
import { User, Address, Checkout } from '../../../generated/graphql';

import { gql, useQuery, useMutation } from '@apollo/client';

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

const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors: checkoutErrors {
        field
        message
      }
      checkout {
        id
        email
        shippingAddress {
          id
        }
        billingAddress {
          id
        }
      }
    }
  }
`;

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

type userCheckoutDetailsQuery = {
  me: User & { checkout: Checkout };
};

export interface ShippingInventoryProps {
  items: any;
  setActiveTab: any;
}

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE = gql`
  mutation checkoutShippingAddressUpdate($checkoutId: String!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      errors {
        field
        message
      }
      checkout {
        id
        shippingAddress
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const ShippingInventory: React.FC<ShippingInventoryProps> = ({ items, setActiveTab }) => {
  const [quantityField, setQuantityField]: any = useState();
  const addressQuery = useQuery<userAddressesQuery>(GET_USER_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [updateShippingAddress, updateShippingAddressResponse] = useMutation(CHECKOUT_SHIPPING_ADDRESS_UPDATE);
  const userCheckoutDetailsQuery = useQuery(USER_CHECKOUT_DETAILS);
  const { user } = useAuth();

  const { loaded, checkout, availableShippingMethods, setShippingAddress, setShippingMethod } = useCheckout();

  const [createCheckout] = useMutation(CREATE_CHECKOUT);

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

  const disableContinue = !selectedAddress || !selectedShippingMethod;

  const handleContinue = async () => {
    if (disableContinue || !selectedAddress || !selectedShippingMethod) {
      return;
    }

    try {
      // Update checkout.
      const setShippingAddressResponse = await setShippingAddress(selectedAddress, checkout.email);
      const setShippingMethodResponse = await setShippingMethod(selectedShippingMethod.id);

      // navigate to next tab
      setActiveTab('payment');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const _createCheckout = async () => {
    // First create checkout
    const {
      firstName,
      lastName,
      companyName,
      streetAddress1,
      streetAddress2,
      city,
      postalCode,
      country,
      countryArea,
      phone,
    } = selectedAddress;
    const checkoutInput = {
      email: user?.email,
      lines: items.map((item) => {
        return { quantity: item.quantity, variantId: item.variant.id };
      }),
      shippingAddress: {
        firstName,
        lastName,
        companyName,
        streetAddress1,
        streetAddress2,
        city,
        postalCode,
        country: country.code,
        countryArea,
        phone,
      },
    };

    const checkoutResponse = await createCheckout({ variables: { checkoutInput } });
  };

  // Set default shipping method
  useEffect(() => {
    if (availableShippingMethods && !selectedShippingMethod) {
      console.log('setting shipping method to', availableShippingMethods[0]);
      setSelectedShippingMethod(availableShippingMethods[0]);
    }
  }, [availableShippingMethods]);
  console.log('availableShippingMethods: ', availableShippingMethods);

  // Set default shipping address
  useEffect(() => {
    if (addressQuery.data) {
      const defaultAddress = addressQuery.data.me.addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addressQuery]);

  const _refreshCheckout = async () => {
    const newCheckout = await _createCheckout();
    console.log('newCheckout. manually refresh page: ', newCheckout);
    // debugger;
    // userCheckoutDetailsQuery.refetch();
    // Temporary(?) workaround for refreshing SaleorState's checkout hooks
    // window.location.reload();
  };

  useEffect(() => {
    if (selectedAddress && checkout && !checkout.id) {
      _refreshCheckout();
    }
  }, [selectedAddress]);

  if (!items || items?.length === 0) {
    return (
      <>
        <SectionHeader subheading="checkout" heading="Cart" />
        <h5>Your cart is empty.</h5>
      </>
    );
  } else if (items && data) {
    return (
      <Card.Body>
        <Row className="mx-n1 mb-4 small">
          <Col lg={2} className="px-1">
            <h6 className="m-0">Shipment</h6>
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
        </Row>
        <h5>Shipment Inventory</h5>
        <Table className="mb-4" borderless striped responsive>
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
                      <td className="text-right font-weight-bold">
                        ${(variant.pricing?.price?.gross.amount || 0).toFixed(2)}
                      </td>
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
        <Table className="mb-4" borderless striped responsive>
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
              const {
                id,
                firstName,
                lastName,
                streetAddress1,
                streetAddress2,
                city,
                countryArea,
                country,
                postalCode,
                companyName,
              } = address;
              const checked = id === selectedAddress?.id;
              return (
                <tr key={index}>
                  <td>
                    <Form.Check
                      custom
                      type="radio"
                      name="shippingAddress"
                      id={`shippingAddress-${id}`}
                      value={id}
                      defaultChecked={index === 0}
                      checked={checked}
                      onChange={() => setSelectedAddress(address)}
                    />
                  </td>
                  <td>
                    {`${firstName} ${lastName}`}
                    <br />
                    {companyName}
                  </td>
                  <td>
                    {`${streetAddress1} ${streetAddress2}`}
                    <br />
                    {`${city}, ${countryArea} ${postalCode}`}
                    <br />
                    {country.code}
                  </td>
                  <td>{index === 0 && `Default`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h5>Domestic Shipping Method</h5>
        <Table className="mb-4" borderless striped responsive>
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
        <Button onClick={handleContinue} disabled={disableContinue}>
          Continue to Payment
        </Button>
      </Card.Body>
    );
  } else {
    return <h5>Loading Cart...</h5>;
  }
};
