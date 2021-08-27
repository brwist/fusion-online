import React, { ReactElement } from 'react';
import { Row, Col, Card, Button, Form, FormGroup } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { User, Address, AddressInput, CountryCode } from '../../../generated/graphql';
import { useQuery, useMutation } from '@apollo/client';

import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

import { GET_USER_ADDRESSES, CREATE_USER_ADDRESS } from '../../../graphql/account';
import { GET_SHOP } from '../../../graphql/shop';

interface Props {
  user: User | undefined;
  handleCloseEdit: Function;
}

type FormValues = {
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
  customerId: string;
  shipToName: string;
  shipVia: string;
  vatId: number;
  shipToNum: number;
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
  const [createAddress, { data, loading, error }] = useMutation<any, AddressMutationInput>(CREATE_USER_ADDRESS, {
    refetchQueries: [{ query: GET_USER_ADDRESSES }],
  });
  const shopQuery = useQuery(GET_SHOP);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const countries = shopQuery.data?.shop.countries;
    // let country = countries.find((x: any) => x.code === data.country);

    let match = Object.entries(CountryCode).find(([key, val]) => val === data.country);
    let country = null,
      val;
    if (match) {
      [val, country] = match;
    }

    // let country = CountryCode[countryKey] || null;
    const payload = { ...data, country };
    console.log('payload: ', payload);
    createAddress({ variables: { input: payload } });
  };

  if (data) {
    // Close the modal on success
    handleCloseEdit();
  }

  const textInput = (name: keyof FormValues, label: string) => {
    return (
      <FormGroup>
        <Form.Label>{label}</Form.Label>
        <input type="text" {...register(name)} />
        {errors[name] ? <span>This field is required</span> : null}
      </FormGroup>
    );
  };

  const numInput = (name: keyof FormValues, label: string) => {
    return (
      <FormGroup>
        <Form.Label>{label}</Form.Label>
        <input type="number" {...register(name)} />
        {errors[name] ? <span>This field is required</span> : null}
      </FormGroup>
    );
  };

  const locationSelect = (name: keyof FormValues, label: string, options: Array<LocationOption>) => {
    return (
      <FormGroup>
        <Form.Label>{label}</Form.Label>
        <select {...register(name)}>
          {options.map((c, i) => {
            return (
              <option key={i} value={c.abbreviation}>
                {c.name}
              </option>
            );
          })}
        </select>
        {errors[name] ? <span>This field is required</span> : null}
      </FormGroup>
    );
  };

  if (error) {
    console.log('error: ', error);
  }

  if (loading) {
    console.log('loading: ', loading);
  }

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
      <FormGroup>
        <Form.Label>Zipcode</Form.Label>
        <input type="text" minLength={5} maxLength={5} {...register('postalCode')} />
        {errors['postalCode'] ? <span>This field is required</span> : null}
      </FormGroup>
    );
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {textInput('firstName', 'First Name')}
        {textInput('lastName', 'Last Name')}
        {textInput('streetAddress1', 'Street Address 1')}
        {textInput('streetAddress2', 'Street Address 2')}
        {textInput('city', 'City')}
        {locationSelect('country', 'Country', countries)}
        <RenderStateSelect />
        {zipInput()}
        {textInput('customerId', 'Customer ID')}
        {textInput('shipToName', 'Ship to Name')}
        {textInput('shipVia', 'Ship via')}
        {numInput('vatId', 'VAT ID')}
        {numInput('shipToNum', 'Ship to Number')}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
