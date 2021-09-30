import React from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {Button} from "react-bootstrap";

interface PaymentFormProps {
  onSubmit: any
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    await onSubmit(stripe, elements);

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>Pay</Button>
    </form>
  )
}