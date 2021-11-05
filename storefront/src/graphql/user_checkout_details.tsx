import { gql } from '@apollo/client';

export const USER_CHECKOUT_DETAILS = gql`
  fragment Checkout_Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }

  fragment Checkout_ProductVariant on ProductVariant {
    id
    name
    pricing {
      onSale
      priceUndiscounted {
        ...Checkout_Price
      }
      price {
        ...Checkout_Price
      }
    }
    product {
      id
      name
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }

  fragment CheckoutLine on CheckoutLine {
    id
    quantity
    totalPrice {
      ...Checkout_Price
    }
    variant {
      stockQuantity
      ...Checkout_ProductVariant
    }
    quantity
  }

  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
  }

  fragment ShippingMethod on ShippingMethod {
    id
    name
    price {
      currency
      amount
    }
  }

  fragment Checkout on Checkout {
    availablePaymentGateways {
      id
      name
      config {
        field
        value
      }
    }
    token
    id
    totalPrice {
      ...Checkout_Price
    }
    subtotalPrice {
      ...Checkout_Price
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    email
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    shippingPrice {
      ...Checkout_Price
    }
    lines {
      ...CheckoutLine
    }
    isShippingRequired
    discount {
      currency
      amount
    }
    discountName
    translatedDiscountName
    voucherCode
  }

  query UserCheckoutDetails {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;
