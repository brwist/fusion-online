import gql from "graphql-tag";
import makeQuery from "@saleor/hooks/makeQuery";
import { ProductListVariables } from "../products/types/ProductList";

const MoneyFragmentDoc = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    name
    slug
    category {
      name
    }
    updatedAt
    metadata {
      key
      value
    }
    variants {
      id
      sku
      quantityAvailable
    }
    isAvailable
    isPublished
    productType {
      id
      name
      hasVariants
    }
  }
`;

const pricingProductListQuery = gql`
  query ProductList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ProductFilterInput
    $sort: ProductOrder
  ) {
    products(before: $before, after: $after, first: $first, last: $last, filter: $filter, sortBy: $sort) {
      edges {
        node {
          ...Product
          attributes {
            attribute {
              id
              slug
              name
            }
            values {
              id
              name
            }
          }
          pricing {
            priceRangeUndiscounted {
              start {
                gross {
                  ...Money
                }
              }
              stop {
                gross {
                  ...Money
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
  ${ProductFragmentDoc}
  ${MoneyFragmentDoc}
`;

export const usePricingProductListQuery = makeQuery<any, ProductListVariables>(pricingProductListQuery);

const offerListQuery = gql `
query OfferList ($itemMasterId: String) {
  offers (itemMasterId: $itemMasterId) {
    id
    type
    itemTypeId
    offerId
    leadTimeDays
    dateAdded
    itemMasterId
    mpn
    mcode
    quantity
    offerPrice
    dateCode
    comment
    coo
    vendor {
      id
      vendorName
      vendorType
      vendorNumber
      vendorRegion
    }
    tariffRate
    productVariant {
      id
      sku
      margin
      quantityAvailable
      price {
        ...Money
      }
    }
  }
  }${MoneyFragmentDoc}`

  export const useOfferListQuery = makeQuery<any, {itemMasterId: string}>(offerListQuery);