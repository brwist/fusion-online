import { gql } from '@apollo/client';

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
        ...AddressFields
      }
    }
  }
  ${AddressFragment}
`;
