import React from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { AddressInput, CountryCode} from '../../../generated/graphql';
import { useMutation } from '@apollo/client';
import { AddressTypeEnum } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

import { GET_USER_ADDRESSES, CREATE_USER_ADDRESS} from '../../../graphql/account';
import { useDefaultUserAddress, useDeleteUserAddresss } from "@saleor/sdk";

interface Props {
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
  }
  handleCloseEdit: Function;
}

type FormValues = {
  shipToName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  city: string;
  country: string;
  countryArea: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
  vatId: string;
  isDefaultShippingAddress: boolean;
};

type LocationOption = {
  name: string;
  abbreviation: string;
};

type AddressMutationInput = {
  input: AddressInput;
};

export const EditShippingAddress: React.FC<Props> = ({ user, handleCloseEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();
  const [createAddress, { data }] = useMutation<any, AddressMutationInput>(CREATE_USER_ADDRESS, {
    refetchQueries: [{ query: GET_USER_ADDRESSES }]
  });

  const [setDefaultUserAddress] = useDefaultUserAddress()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let match = Object.entries(CountryCode).find(([key, val]) => val === data.country);
    let country = null,
      val;
    if (match) {
    // eslint-disable-next-line
      [val, country] = match;
    }

    const isDefaultShippingAddress = data.isDefaultShippingAddress
    // remove to make create mutation work correctly for now
    delete data.isDefaultShippingAddress
    const payload = { ...data, country};
    console.log('payload: ', payload);
    try {
      const newAddress = await createAddress({ variables: { input: payload } });
      if (isDefaultShippingAddress) {
        const id = newAddress?.data?.accountAddressCreate.address.id
        setDefaultUserAddress({id, type: AddressTypeEnum.SHIPPING})
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  if (data) {
    // Close the modal on success
    handleCloseEdit();
  }

  const textInput = (name: keyof FormValues, label: string, required: boolean = false) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        {required ? (
          <Form.Control className={errors[name] ? "is-invalid" : ""} type="text" {...register(name, { required: true })} />
        ) : (
          <Form.Control type="text" {...register(name)} />
        )}
        {errors[name] ? <span className="invalid-feedback">This field is required</span> : null}
      </Form.Group>
    );
  };

  const numInput = (name: keyof FormValues, label: string) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="number" {...register(name)} />
        {errors[name] ? <span className="invalid-feedback">This field is required</span> : null}
      </Form.Group>
    );
  };

  const locationSelect = (name: keyof FormValues, label: string, options: Array<LocationOption>) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" custom {...register(name, { required: true })}>
          {options.map((c, i) => {
            return (
              <option key={i} value={c.abbreviation}>
                {c.name}
              </option>
            );
          })}
        </Form.Control>
        {errors[name] ? <span className="invalid-feedback">This field is required</span> : null}
      </Form.Group>
    );
  };

  const RenderStateSelect = () => {
    const countryVal = useWatch({
      control,
      name: 'country',
    });
    switch (countryVal) {
      case 'US':
        return locationSelect('countryArea', 'State', usStates);
      case 'CA':
        return locationSelect('countryArea', 'Province', caStates);
      default:
        return <div />;
    }
  };

  const zipInput = () => {
    return (
      <Form.Group>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          className={errors['postalCode'] ? "is-invalid" : ""}
          type="text"
          {...register('postalCode', {
            required: {
              value: true,
              message: 'Postal code is required.',
            },
            minLength: {
              value: 5,
              message: 'Postal code must be 5 digits.',
            },
            maxLength: {
              value: 5,
              message: 'Postal code must be 5 digits.',
            },
            pattern: {
              value: /[0-9]{5}/,
              message: 'Invalid postal code.',
            },
          })}
        />
        {errors['postalCode'] ? <span className="invalid-feedback">{errors.postalCode.message}</span> : null}
      </Form.Group>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {textInput('shipToName', 'Address Name', true)}
      {textInput('firstName', 'First Name', true)}
      {textInput('lastName', 'Last Name', true)}
      {textInput('streetAddress1', 'Street Address 1', true)}
      {textInput('streetAddress2', 'Street Address 2')}
      <Form.Row>
        <Col lg={6}>
          {textInput('city', 'City', true)}
        </Col>
        <Col>
          {textInput('countryArea', 'State / Country Area', true)}
        </Col>
        <Col>
          {zipInput()}
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          {locationSelect('country', 'Country', countries)}
        </Col>
        <Col>
          {textInput('vatId', 'VAT ID')}
        </Col>
      </Form.Row>
      <Form.Group>
        <Form.Check
          id="save-as-default-address"
          custom
          type="checkbox"
          label="Save as default address"
          {...register('isDefaultShippingAddress')}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Save</Button>
      <Button variant="link" onClick={() => handleCloseEdit()}>Cancel</Button>
    </Form>
  );
};
