import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';

import { useQuery } from '@apollo/client';
import { useCreateUserAddress } from '@saleor/sdk';

import './myaccount.scss';

import { GET_USER_ADDRESSES } from '../../config';
import { User, Address } from '../../generated/graphql';

type userAddressesQuery = {
  me: User 
  & { addresses: Array<Address> }
}

export interface ShippingProps {}

export const Shipping: React.FC<ShippingProps> = ({ ...props }) => {
  const {data, loading, error} = useQuery<userAddressesQuery>(GET_USER_ADDRESSES);

  const formatPhoneNumber = (phoneNumberString: String) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  if (loading) return (
    <div className="shipping">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Shipping</h2>
      </header>
      <p>Loading...</p>;
      <Button variant="primary">Add Shipping Address</Button>
    </div>
  );
  
  if (error) return (
    <div className="shipping">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Shipping</h2>
      </header>
      <p>Error!</p>;
      <Button variant="primary">Add Shipping Address</Button>
    </div>
  );
  
  if (data) {
    const userAddresses = data.me?.addresses || []
    const renderedAddresses = userAddresses.map((address) => {
      return (
        <Card key={address?.id}>
          <Card.Body>
            <Row>
              <Col>
                <div className="mb-2">
                  {address?.firstName} {address?.lastName}
                  <br />
                  {address?.streetAddress1}{address?.streetAddress2 && `, ${address?.streetAddress2}`}
                  <br />
                  {address?.city}, {address?.countryArea} {address?.postalCode}, {address?.country.code}
                  <br />
                  {address?.phone && formatPhoneNumber(address?.phone)}
                </div>
                <div>
                  <Button variant="link" className="small px-0">
                    EDIT ADDRESS
                  </Button>{' '}
                  |{' '}
                  <Button variant="link" className="small px-0">
                    REMOVE ADDRESS
                  </Button>
                </div>
              </Col>
              {address?.isDefaultShippingAddress && <Col className="text-right">
                <Tag size="sm" label="Default" />
              </Col>}
            </Row>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div className="shipping">
        <header className="my-3 d-flex justify-content-between align-items-center">
          <h2 className="h3 m-0">Shipping</h2>
        </header>
        {renderedAddresses}
        <Button variant="primary">Add Shipping Address</Button>
      </div>
    );
  }

  return (
    <div className="shipping">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Shipping</h2>
      </header>
      <Button variant="primary">Add Shipping Address</Button>
    </div>
  );
};
