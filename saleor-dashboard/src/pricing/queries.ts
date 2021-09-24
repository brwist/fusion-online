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