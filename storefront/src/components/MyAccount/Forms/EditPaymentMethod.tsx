import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Col, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { gql } from '@apollo/client';

import { User, CountryCode } from '../../../generated/graphql';
import { useMutation } from '@apollo/client';

import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

interface Props {
  user: User | undefined;
  handleCloseEdit: Function;
  onSuccess: Function;
}

type errorsType =
  | {
      message: string;
    }[]
  | [];

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

export const ADD_STRIPE_TOKEN = gql`
  mutation addStripeToken($paymentMethodId: String!) {
    addStripePaymentMethod(paymentMethodId: $paymentMethodId) {
      user {
        id
        stripeCards {
          id
        }
      }
    }
  }
`;

export const EditPaymentMethod: React.FC<Props> = ({ user, handleCloseEdit, onSuccess }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitError, setSubmitError] = useState<String | null>(null);
  const [addStripeToken, stripeTokenResponse] = useMutation(ADD_STRIPE_TOKEN);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();

  useEffect(() => {
    if (stripeTokenResponse.data) {
      onSuccess();
    }
  }, [stripeTokenResponse, onSuccess]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // First check CC
    const cardElement = elements?.getElement(CardNumberElement);

    if (cardElement) {
      let match = Object.entries(CountryCode).find(([key, val]) => val === data.country);
      let country = null,
        val;
      if (match) {
        // eslint-disable-next-line
        [val, country] = match;
      }

      // Use your card Element with other Stripe.js APIs
      const stripeResponse = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          address: {
            city: data.city,
            state: data.countryArea,
            country: data.country,
            line1: data.streetAddress1,
            line2: data.streetAddress2,
            postal_code: data.postalCode,
          },
          name: `${data.firstName} ${data.lastName}`,
        },
      });

      if (stripeResponse?.error) {
        console.log('stripeResponse?.error: ', stripeResponse?.error);
      } else if (stripeResponse?.paymentMethod) {
        const { card, id } = stripeResponse.paymentMethod;
        if (card?.brand && card?.last4) {
          addStripeToken({ variables: { paymentMethodId: id } });
        }
      } else {
        setSubmitError('Payment submission error. Stripe gateway returned no payment method in payload.');
      }
    } else {
      setSubmitError('Stripe gateway improperly rendered. Stripe elements were not provided.');
    }
  };

  const textInput = (name: keyof FormValues, label: string, required: boolean = false) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        {required ? (
          <Form.Control type="text" {...register(name, { required: true })} />
        ) : (
          <Form.Control type="text" {...register(name)} />
        )}
        {errors[name] ? <span>This field is required</span> : null}
      </Form.Group>
    );
  };

  const numInput = (name: keyof FormValues, label: string) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="number" {...register(name)} />
        {errors[name] ? <span>This field is required</span> : null}
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
        {errors[name] ? <span>This field is required</span> : null}
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
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
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
      </Form.Group>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Credit Card Number</Form.Label>
        <CardNumberElement className="form-control" />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Expiration Date</Form.Label>
          <CardExpiryElement className="form-control" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>CCV</Form.Label>
          <CardCvcElement className="form-control" />
        </Form.Group>
      </Form.Row>

      {textInput('firstName', 'First Name', true)}
      {textInput('lastName', 'Last Name', true)}
      {textInput('streetAddress1', 'Street Address 1', true)}
      {textInput('streetAddress2', 'Street Address 2')}
      <Form.Row>
        <Col lg={6}>{textInput('city', 'City', true)}</Col>
        <Col>
          <RenderStateSelect />
        </Col>
        <Col>{zipInput()}</Col>
      </Form.Row>
      {locationSelect('country', 'Country', countries)}
      <Form.Group>
        <Form.Check custom type="checkbox" label="Save as default payment method" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Payment Method
      </Button>
      <Button variant="link" onClick={() => handleCloseEdit()}>
        Cancel
      </Button>
    </Form>
  );
};
