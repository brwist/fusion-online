import React, { useState } from 'react';
import { CardNumberElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { User, AddressInput, CountryCode } from '../../../generated/graphql';
import { useMutation } from '@apollo/client';
import { PaymentForm } from '../../CheckoutPage/PaymentForm';

import usStates from '../../../utils/us-states.json';
import caStates from '../../../utils/ca-states.json';
import countries from '../../../utils/countries.json';

import { GET_USER_ADDRESSES, CREATE_USER_ADDRESS } from '../../../graphql/account';

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

interface PaymentFormProps {
  onSubmit: any;
}

export const EDIT_USER_PRIVATE_METADATA = gql`
  mutation updatePrivateMetadata($id: ID!, $input: MetadataInput!) {
    updatePrivateMetadata(id: $id, input: $input) {
      address {
        id
        ...AddressFields
      }
    }
  }
`;

export const EditPaymentMethod: React.FC<Props> = ({ user, handleCloseEdit }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitErrors, setSubmitErrors] = useState<errorsType>([]);

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
      });

      if (stripeResponse?.error) {
        const errors = [
          {
            ...stripeResponse.error,
            message: stripeResponse.error.message || '',
          },
        ];
        setSubmitErrors(errors);
      } else if (stripeResponse?.paymentMethod) {
        const { card, id } = stripeResponse.paymentMethod;
        if (card?.brand && card?.last4) {
          // processPayment('mirumee.payments.stripe', id, {
          //   brand: card?.brand,
          //   expMonth: card?.exp_month || null,
          //   expYear: card?.exp_year || null,
          //   firstDigits: null,
          //   lastDigits: card?.last4,
          // });
        }
      } else {
        const stripePayloadErrors = [
          {
            message: 'Payment submission error. Stripe gateway returned no payment method in payload.',
          },
        ];
        setSubmitErrors(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        {
          message: 'Stripe gateway improperly rendered. Stripe elements were not provided.',
        },
      ];
      setSubmitErrors(stripeElementsErrors);
    }
  };

  //   if (data) {
  //     // Close the modal on success
  //     handleCloseEdit();
  //   }

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

  //   const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     if (!stripe || !elements) {
  //       return;
  //     }
  //     // await onSubmit(stripe, elements);

  //   };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CardElement />
      {textInput('firstName', 'First Name', true)}
      {textInput('lastName', 'Last Name', true)}
      {textInput('streetAddress1', 'Street Address 1', true)}
      {textInput('streetAddress2', 'Street Address 2')}
      {textInput('city', 'City', true)}
      {locationSelect('country', 'Country', countries)}
      <RenderStateSelect />
      {zipInput()}
      <Button type="submit">Save Payment Method</Button>
    </Form>
  );
};
