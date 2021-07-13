import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useCategoryDetails } from '@saleor/sdk'

import { useProductListQuery, AttributeInput } from '../../generated/graphql'
import { ProductTable } from '../ProductTable/ProductTable'
import { ProductFilters } from '../ProductFilters/ProductFilters'
import { SectionHeader } from '../SectionHeader/SectionHeader'

import './categorypage.scss'

export interface CategoryPageProps {

}

export const CategoryPage: React.FC<CategoryPageProps> = ({...props}) => {
  const [attributes, setAttributes] = useState<Array<AttributeInput>>([]);
  const {id} = useParams<{id: string}>();
  const category = useCategoryDetails({id: id});
  const productList = useProductListQuery({
    variables: {filter: {categories: [id], isPublished: true, attributes: attributes}, first: 100}
  });
  
  let productData: any = [];
  if (productList.data) {
    productData = productList.data.products?.edges.map(({node}) => {
      return {
        otherData: {
          saved: false,
          status: "Incoming Stock"
        },
        product: node
      }
    }) || []
  }
  return (
    <Container>
        <SectionHeader subheading="Shop" heading={category.data?.name || ""}/>
      <Row>
        <Col lg={2}>
          <ProductFilters
            setFilters={(filters: AttributeInput[]) => {setAttributes(filters)}}
            categoryId={id}
          />
        </Col>
        <Col>
          <ProductTable 
            loading={productList.loading}
            productData={productData}
          />
        </Col>
      </Row>
    </Container>
  )
}