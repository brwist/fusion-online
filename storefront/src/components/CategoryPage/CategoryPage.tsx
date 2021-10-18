import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useCategoryDetails } from '@saleor/sdk';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_LIST } from '../../config';

import { 
  Attribute,
  AttributeValue,
  AttributeInput,
  Maybe,
  Money,
  PageInfo,
  Product,
  ProductCountableConnection,
  ProductType,
  ProductVariant
} from '../../generated/graphql';
import { ProductTable } from '../ProductTable/ProductTable';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { ScrollToTopOnMount } from '../../utils/ScrollToTopOnMount';
import { ItemAddedAlert } from '../AddToCart/ItemAddedAlert';

import './categorypage.scss';

export interface CategoryPageProps {
  addItem: any
}
export type MoneyFragment = (
  { __typename: 'Money' }
  & Pick<Money, 'amount' | 'currency'>
);

export type ProductFragment = (
  Product
  & { productType: (
    & Pick<ProductType, 'id' | 'name' | 'hasVariants'>
  ), variants: Array<(
    & Pick<ProductVariant, 'id' | 'sku' | 'quantityAvailable' >
  )>}
);

export type ProductListQuery = (
  { products?: Maybe<(
    & Pick<ProductCountableConnection, 'totalCount'>
    & { edges: Array<(
      & { node: (
        & { attributes: Array<(
          & { attribute: (
            & Pick<Attribute, 'id'>
          ), values: Array<Maybe<(
            & Pick<AttributeValue, 'id' | 'name'>
          )>> }
        )>, pricing?: Maybe<(
          & { priceRangeUndiscounted?: Maybe<(
            & { start?: Maybe<(
              & { gross: (
                & MoneyFragment
              ) }
            )>, stop?: Maybe<(
              & { gross: (
                & MoneyFragment
              ) }
            )> }
          )> }
        )> }
        & ProductFragment
      ) }
    )>, pageInfo: (
      & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'>
    ) }
  )> }
);

export const CategoryPage: React.FC<CategoryPageProps> = ({addItem}) => {
  const [attributes, setAttributes] = useState<Array<AttributeInput>>([]);
  const {slug} = useParams<{slug: string}>();
  const category = useCategoryDetails({slug: slug});
  const [showAlert, setShowAlert] = useState(false);
  const [selectedQuantity, setSelectedQuantity ] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const {data, loading} = useQuery<ProductListQuery>(GET_PRODUCT_LIST, {
    variables: {filter: {categories: category.data?.id ? [category.data?.id] : [], isPublished: true, attributes: attributes}, first: 100}
  })
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products.edges)
    }
  })

  return (
    <>
    <ItemAddedAlert 
      productName={selectedProduct || "Item"}
      quantity={selectedQuantity}
      show={showAlert}
      hideAlert={() => setShowAlert(false)}
    />
    <Container onClick={() => showAlert && setShowAlert(false)}>
      <ScrollToTopOnMount />
        <SectionHeader subheading="Shop" heading={category.data?.name || ""}/>
      <Row>
        <Col lg={2}>
          <ProductFilters
            setFilters={(filters: AttributeInput[]) => {setAttributes(filters)}}
            categoryId={category.data?.id}
          />
        </Col>
        <Col>
          <ProductTable 
            loading={loading}
            productData={products}
            addItem={addItem}
            updateSelectedProduct={(productName: string) => setSelectedProduct(productName)}
            updateSelectedQuantity={(quantity: number) => setSelectedQuantity(quantity)}
            showItemAddedAlert={ () => setShowAlert(true)}
          />
        </Col>
      </Row>
    </Container>
    </>
  )
}