import React from 'react'
import {useParams} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useCategoryDetails } from '@saleor/sdk'
import { useProductListQuery } from '../../generated/graphql'

import './categorypage.scss'

export interface CategoryPageProps {

}

export const CategoryPage: React.FC<CategoryPageProps> = ({...props}) => {
  const {id} = useParams<{id: string}>()
  const category = useCategoryDetails({id: id})
  const productList = useProductListQuery({variables: {filter: {categories: [id], isPublished: true}, first: 100}})
  console.log(productList.data)
  return (
    <Container>
      <h1>{category.data?.name}</h1>
    </Container>
  )
}