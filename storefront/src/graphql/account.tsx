import { gql } from '@apollo/client';
import { User, Scalars, Order } from '../generated/graphql';
import { QueryHookOptions, useQuery } from '@apollo/client';

export const CONFIRM_ACCOUNT = gql`
  mutation AccountConfirm($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      errors {
        field
        message
      }
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query userAddresses {
    me {
      addresses {
        id
        isDefaultBillingAddress
        isDefaultShippingAddress
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        countryArea
        postalCode
        country {
          code
        }
        phone
        companyName
        shipToName
        customerId
        vatId
      }
    }
  }
`;

export const AddressFragment = gql`
  fragment AddressFields on Address {
    firstName
    lastName
    streetAddress1
    streetAddress2
    city
    country {
      country
      code
    }
    countryArea
    postalCode
    customerId
    shipToName
    shipVia
    vatId
  }
`;

export const EDIT_USER_ADDRESS = gql`
  mutation editAddress($id: ID!, $input: AddressInput!) {
    accountAddressUpdate(id: $id, input: $input) {
      address {
        id
        ...AddressFields
      }
    }
  }
  ${AddressFragment}
`;

export const CREATE_USER_ADDRESS = gql`
  mutation createAddress($input: AddressInput!) {
    accountAddressCreate(input: $input) {
      address {
        id
        ...AddressFields
      }
    }
  }
  ${AddressFragment}
`;

export const PriceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
      __typename
    }
    net {
      amount
      currency
      __typename
    }
    __typename
  }
`;

export const GET_ORDERS_BY_USER = gql`
  query OrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      orders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
          __typename
        }
        edges {
          node {
            id
            token
            number
            statusDisplay
            created
            total {
              ...Price
            }
            lines {
              id
              variant {
                id
                __typename
                quantityAvailable
                product {
                  name
                  id
                  __typename
                  metadata {
                    key
                    value
                  }
                  attributes {
                    attribute {
                      id
                      name
                    }
                    values {
                      id
                      name
                    }
                  }
                }
              }
              __typename
              productName
              productSku
              quantity
              totalPrice {
                gross {
                  amount
                }
              }
              unitPrice {
                gross {
                  amount
                }
              }
            }
            __typename
            shippingAddress {
              ...AddressFields
            }
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  ${PriceFragment}
  ${AddressFragment}
`;

export type OrdersByUserQueryVariables = {
  perPage: number;
  after?: string;
};

export type OrdersByUserQuery = {
  me: User;
};

export function useOrdersByUserQuery(baseOptions?: QueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables>) {
  const options = { ...baseOptions };
  return useQuery(GET_ORDERS_BY_USER, options);
}

export const GET_USER_ORDER_BY_TOKEN = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
      __typename
    }
    __typename
    tax {
      amount
    }
  }

  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    metadata {
      key
      value
    }
    quantityAvailable
    isAvailable
    pricing {
      onSale
      priceUndiscounted {
        ...Price
        __typename
      }
      price {
        ...Price
        __typename
      }
      __typename
    }
    attributes {
      attribute {
        id
        __typename
        slug
      }
      values {
        id
        name
        value: name
        __typename
      }
      __typename
    }
    product {
      id
      name
      productType {
        id
        isShippingRequired
        __typename
      }
      attributes {
        attribute {
          slug
        }
        values {
          name
        }
      }
      __typename
    }
    __typename
  }

  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    status
    statusDisplay
    id
    token
    number
    shippingAddress {
      ...AddressFields
      __typename
    }
    lines {
      productName
      quantity
      variant {
        ...ProductVariant
        __typename
      }
      unitPrice {
        currency
        ...OrderPrice
        __typename
      }
      totalPrice {
        currency
        ...OrderPrice
        __typename
        tax {
          amount
        }
      }
      __typename
      id
      productSku
    }
    subtotal {
      ...OrderPrice
      __typename
    }
    total {
      ...OrderPrice
      __typename
    }
    shippingPrice {
      ...OrderPrice
      __typename
    }
    __typename
    created
    customerNote
    payments {
      creditCard {
        brand
        expMonth
        expYear
        firstDigits
        lastDigits
      }
    }
    billingAddress {
      ...AddressFields
    }
    fulfillments {
      created
      fulfillmentOrder
      trackingNumber
      statusDisplay
    }
  }

  fragment InvoiceFragment on Invoice {
    id
    number
    createdAt
    url
    status
    __typename
  }

  query UserOrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
      invoices {
        ...InvoiceFragment
        __typename
      }
      __typename
    }
  }
  ${AddressFragment}
  ${PriceFragment}
`;
export type UserOrderByTokenQueryVariables = {
  token: Scalars['UUID'];
};

export type UserOrderByTokenQuery = { orderByToken?: Order };

export function useUserOrderByTokenQuery(
  baseOptions?: QueryHookOptions<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>
) {
  const options = { ...baseOptions };
  return useQuery(GET_USER_ORDER_BY_TOKEN, options);
}

export const CREATE_USER = gql`
  mutation registerUser($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      accountErrors {
        field
        message
        code
      }
      user {
        id
        firstName
        lastName
        email
        metadata {
          key
          value
        }
      }
    }
  }
`;


export const REQUEST_PASSWORD_RESET = gql `
mutation passwordResetRequest ($email: String!) {
  requestPasswordReset (email: $email) {
		accountErrors {
      field
      message
    }
  }
}
`

export const SET_PASSWORD = gql `
mutation setPassword ($email: String!, $token: String!, $password: String!) {
  setPassword (email: $email, token: $token, password: $password) {
		accountErrors {
      field
      message
    }
  }
}
`