import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductTable } from '../ProductTable/ProductTable';
import { SearchBar } from '../SearchBar/SearchBar';
import { AttributeInput } from '../../generated/graphql';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { ItemAddedAlert } from '../AddToCart/ItemAddedAlert';

import { useQuery } from '@apollo/client';
import { GET_PRODUCT_LIST } from '../../config';
import { ProductListQuery } from '../CategoryPage/CategoryPage'

export interface SearchContainerProps {
  addItem: any,
  userApproval: boolean | undefined
};

export const SearchContainer: React.FC<SearchContainerProps> = ({addItem, userApproval}) => {
  const useQuerySearch = () => {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuerySearch();
  const initialSearchQuery = query.get('q');
  const [searchQuery, setSearchquery] = useState(initialSearchQuery|| '');
  const [attributes, setAttributes] = useState<Array<AttributeInput>>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedQuantity, setSelectedQuantity ] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { data, loading } = useQuery<ProductListQuery>(GET_PRODUCT_LIST, {
    variables: {filter: {search: searchQuery, attributes: attributes, isPublished: true, isAvailable: true}, first: 100},
    fetchPolicy: 'network-only'
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
      <Row>
        <Col lg={2}>
          <ProductFilters setFilters={(filters: AttributeInput[]) => {setAttributes(filters)}} />
        </Col>
        <Col>
          <SearchBar initialSearchQuery={initialSearchQuery} updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}} />
          <ProductTable 
            loading={loading}
            productData={products}
            userApproval={userApproval}
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
