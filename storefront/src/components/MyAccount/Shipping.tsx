import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Tag } from '../Tag/Tag';

import { useQuery, useMutation } from '@apollo/client';
import { useCreateUserAddress } from '@saleor/sdk';

import './myaccount.scss';

import { GET_USER_ADDRESSES } from '../../graphql/account';

import { User, Address } from '../../generated/graphql';
import { EditShippingAddress } from './Forms/EditShippingAddress';

type userAddressesQuery = {
  me: User & { addresses: Array<Address> };
};

export interface ShippingProps {}

interface EditMode {
  edit: Boolean;
  address?: Address;
}

export const Shipping: React.FC<ShippingProps> = ({ ...props }) => {
  const { data, loading, error } = useQuery<userAddressesQuery>(GET_USER_ADDRESSES);
  const [editMode, setEditMode] = useState<EditMode | null>();

  const formatPhoneNumber = (phoneNumberString: String) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  const handleCloseEdit = () => {
    setEditMode(null);
  };

  const renderShippingAddresses = () => {
    if (!data) {
      return <div />;
    }

    if (error) {
      return <p>Error!</p>;
    }

    if (loading) {
      return <p>Loading...</p>;
    }

    const userAddresses = data.me?.addresses || [];
    return userAddresses.map((address) => {
      return (
        <Card key={address?.id}>
          <Card.Body>
            <Row>
              <Col>
                <div className="mb-2">
                  {address?.firstName} {address?.lastName}
                  <br />
                  {address?.streetAddress1}
                  {address?.streetAddress2 && `, ${address?.streetAddress2}`}
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
              {address?.isDefaultShippingAddress && (
                <Col className="text-right">
                  <Tag size="sm" label="Default" />
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      );
    });
  };

  const editHeader = () => {
    if (!editMode) {
      return;
    }
    if (editMode.edit) {
      return `Edit Shipping Address`;
    }
    return `New Shipping Address`;
  };

  return (
    <div className="shipping">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Shipping</h2>
      </header>
      {renderShippingAddresses()}
      <Button variant="primary" onClick={() => setEditMode({ edit: false })}>
        Add Shipping Address
      </Button>
      <Modal show={!!editMode}>
        <Modal.Header>{editHeader()}</Modal.Header>
        <Modal.Body>
          <EditShippingAddress user={data?.me} handleCloseEdit={handleCloseEdit} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
