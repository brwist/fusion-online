import React, { useState } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Col, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { gql, useQuery } from '@apollo/client';

import { User, AddressInput, CountryCode } from '../../../generated/graphql';
import { useMutation } from '@apollo/client';
import { PaymentForm } from '../../CheckoutPage/PaymentForm';

import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

interface Props {
  user: User | undefined;
  handleCloseEdit: Function;
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

export const EditPaymentMethod: React.FC<Props> = ({ user, handleCloseEdit }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitError, setSubmitError] = useState<String | null>(null);
  const [addStripeToken, stripeTokenResponse] = useMutation(ADD_STRIPE_TOKEN);
  console.log('stripeTokenResponse: ', stripeTokenResponse);

  if (user) {
    console.log('user: ', user);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // First check CC
    const cardElement = elements?.getElement(CardElement);
    console.log('cardElement: ', cardElement);

    if (cardElement) {
      let match = Object.entries(CountryCode).find(([key, val]) => val === data.country);
      let country = null,
        val;
      if (match) {
        // eslint-disable-next-line
        [val, country] = match;
      }
      const payload = { ...data, country };
      console.log('payload: ', payload);

      // Use your card Element with other Stripe.js APIs
      const stripeResponse = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          address: {
            city: data.city,
            country: data.country,
            line1: data.streetAddress1,
            line2: data.streetAddress2,
            postal_code: data.postalCode,
          },
        },
      });

      console.log('stripeResponse: ', stripeResponse);

      if (stripeResponse?.error) {
        console.log('stripeResponse?.error: ', stripeResponse?.error);
        // const errors = [
        //   {
        //     ...stripeResponse.error,
        //     message: stripeResponse.error.message || '',
        //   },
        // ];
        // setSubmitErrors(errors);
      } else if (stripeResponse?.paymentMethod) {
        const { card, id } = stripeResponse.paymentMethod;
        if (card?.brand && card?.last4) {
          addStripeToken({ variables: { paymentMethodId: id } });
          // processPayment('mirumee.payments.stripe', id, {
          //   brand: card?.brand,
          //   expMonth: card?.exp_month || null,
          //   expYear: card?.exp_year || null,
          //   firstDigits: null,
          //   lastDigits: card?.last4,
          // });
        }
      } else {
        setSubmitError('Payment submission error. Stripe gateway returned no payment method in payload.');
      }
    } else {
      setSubmitError('Stripe gateway improperly rendered. Stripe elements were not provided.');
    }
  };

  //   if (data) {
  //     // Close the modal on success
  //     handleCloseEdit();
  //   }

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

  //   const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     if (!stripe || !elements) {
  //       return;
  //     }
  //     // await onSubmit(stripe, elements);

  //   };

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
      <Button variant="link">Cancel</Button>
    </Form>
  );
};
