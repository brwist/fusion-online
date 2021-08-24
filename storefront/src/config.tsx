import {gql} from '@apollo/client';

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
        shipToAddressInfo {
          shipToName
          customerId
          vatId
        }
      }
    }
  }
`