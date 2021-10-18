import { gql } from '@apollo/client';

export const MoneyFragmentDoc = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

export const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    name
    slug
    description
    descriptionJson
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

export const GET_PRODUCT_LIST = gql`
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

export const GET_INITIAL_PRODUCT_FILTER_DATA = gql`
  query InitialProductFilterData($categories: [ID!], $productTypes: [ID!], $inCategory: ID) {
    attributes(first: 100, filter: { filterableInStorefront: true, inCategory: $inCategory }) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    categories(first: 100, filter: { ids: $categories }) {
      edges {
        node {
          id
          name
        }
      }
    }
    productTypes(first: 100, filter: { ids: $productTypes }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const PriceFragmentDoc = gql`
  fragment ProductPrice on TaxedMoney {
    gross {
      ...Money
    }
    net {
      ...Money
    }
  }
  ${MoneyFragmentDoc}
`;

export const GET_PRODUCT_DETAILS = gql`
  fragment BasicProductFields on Product {
    id
    name
  }

  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }

  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    metadata {
      key
      value
    }
    isAvailable
    quantityAvailable(countryCode: $countryCode)
    offer {
      id
      leadTimeDays
      coo
    }
    pricing {
      onSale
      priceUndiscounted {
        ...ProductPrice
      }
      price {
        ...ProductPrice
      }
    }
    attributes {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
      }
    }
  }

  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...ProductPrice
        }
        stop {
          ...ProductPrice
        }
      }
      priceRange {
        start {
          ...ProductPrice
        }
        stop {
          ...ProductPrice
        }
      }
    }
  }

  query ProductDetails($slug: String!, $countryCode: CountryCode) {
    product(slug: $slug) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      metadata {
        key
        value
      }
      category {
        id
        name
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      isAvailable
      isAvailableForPurchase
      availableForPurchase
    }
  }
  ${PriceFragmentDoc}
`;

export const GET_CART_PRODUCT_DETAILS = gql`
  query CartProductDetails($ids: [ID!], $first: Int) {
    productVariants(ids: $ids, first: $first) {
      edges {
        node {
          id
          name
          sku
          quantityAvailable
          pricing {
            onSale
            priceUndiscounted {
              ...ProductPrice
            }
            price {
              ...ProductPrice
            }
          }
          product {
            id
            name
            slug
            attributes {
              attribute {
                id
                name
                slug
              }
              values {
                id
                name
              }
            }
          }
        }
      }
    }
  }
  ${PriceFragmentDoc}
`;

export const GET_CATEGORY_LIST = gql`
  query CategoryList($first: Int) {
    categories(first: $first) {
      edges {
        node {
          id
          name
          slug
          parent {
            id
          }
        }
      }
    }
  }
`;
