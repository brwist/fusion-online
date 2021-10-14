import { CardNumberElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import React, {useState} from "react";
import {Container} from "react-bootstrap";
import { useCart, useCheckout } from "@saleor/sdk";
import {PaymentForm} from "./PaymentForm";

interface CheckoutPageProps {

}

type errorsType = {
  message: string
}[] | []

export const CheckoutPage: React.FC<CheckoutPageProps> = (props) => {
  const [submitErrors, setSubmitErrors] = useState<errorsType>([]);
  const {
    loaded: checkoutLoaded,
    checkout,
    payment,
    availablePaymentGateways,
    createPayment,
    completeCheckout,
  } = useCheckout();
  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  const apiKey = process.env.STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe('pk_test_51JeloZGwGY8wmB3De8nkDq2Eex3bllEFKymSMsRiqwXUtxShtr4JVAKjLOi9WxHblgppNkcKTFhe69AFFHCMtesP00O09X3PHO');
  
  const processPayment = async (
    gateway: string,
    token?: string,
    cardData?: any
  ) => {
    
    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
      returnUrl: `${window.location.origin}`,
    });
    const errors = dataError?.error;
    if (errors) {
      console.log(errors);
    }
  };

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    const cardNumberElement = elements?.getElement(CardNumberElement);

    if (cardNumberElement) {
      const payload = await stripe?.createPaymentMethod({
        card: cardNumberElement,
        type: "card",
      });
      if (payload?.error) {
        const errors = [
          {
            ...payload.error,
            message: payload.error.message || "",
          },
        ];
        setSubmitErrors(errors);
      } else if (payload?.paymentMethod) {
        const { card, id } = payload.paymentMethod;
        if (card?.brand && card?.last4) {
          processPayment( "mirumee.payments.stripe", id, {
            brand: card?.brand,
            expMonth: card?.exp_month || null,
            expYear: card?.exp_year || null,
            firstDigits: null,
            lastDigits: card?.last4,
          });
        }
      } else {
        const stripePayloadErrors = [
          {
            message:
              "Payment submission error. Stripe gateway returned no payment method in payload.",
          },
        ];
        setSubmitErrors(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        {
          message:
            "Stripe gateway improperly rendered. Stripe elements were not provided.",
        },
      ];
      setSubmitErrors(stripeElementsErrors);
    }
  };


  
  return (
    <Container>
      <Elements stripe={stripePromise}>
        <PaymentForm onSubmit={handleFormSubmit}/>
      </Elements>
    </Container>
  )
}