import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { User, AddressInput, CountryCode } from '../../../generated/graphql';
import { useMutation } from '@apollo/client';

import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

import { GET_USER_ADDRESSES, CREATE_USER_ADDRESS } from '../../../graphql/account';

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
  vatId: string;
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
    refetchQueries: [{ query: GET_USER_ADDRESSES }],
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let match = Object.entries(CountryCode).find(([key, val]) => val === data.country);
    let country = null,
      val;
    if (match) {
    // eslint-disable-next-line
      [val, country] = match;
    }
    const payload = { ...data, country };
    console.log('payload: ', payload);
    try {
      createAddress({ variables: { input: payload } });
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
      <FormGroup>
        <Form.Label>{label}</Form.Label>
        {required ? (
          <input type="text" {...register(name, { required: true })} />
        ) : (
          <input type="text" {...register(name)} />
        )}
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
        <select {...register(name, { required: true })}>
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
        <input
          type="text"
          {...register('postalCode', {
            required: {
              value: true,
              message: 'Zipcode is required',
            },
            minLength: {
              value: 5,
              message: 'Zipcode must be 5 digits',
            },
            maxLength: {
              value: 5,
              message: 'Zipcode must be 5 digits',
            },
            pattern: {
              value: /[0-9]{5}/,
              message: 'Invalid postal code.',
            },
          })}
        />
        {errors['postalCode'] ? <span>{errors.postalCode.message}</span> : null}
      </FormGroup>
    );
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {textInput('firstName', 'First Name', true)}
        {textInput('lastName', 'Last Name', true)}
        {textInput('streetAddress1', 'Street Address 1', true)}
        {textInput('streetAddress2', 'Street Address 2')}
        {textInput('city', 'City', true)}
        {locationSelect('country', 'Country', countries)}
        <RenderStateSelect />
        {zipInput()}
        {numInput('customerId', 'Customer ID')}
        {textInput('shipToName', 'Ship to Name')}
        {textInput('shipVia', 'Ship via')}
        {textInput('vatId', 'VAT ID')}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
