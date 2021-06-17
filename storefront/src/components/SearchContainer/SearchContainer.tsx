import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap';
import {SearchResults} from '../SearchResults/SearchResults';
import {SearchBar} from '../SearchBar/SearchBar';
import {useProductListQuery} from '../../generated/graphql'
import {SearchFilters} from '../SearchFilters/SearchFilters'


export interface SearchContainerProps {};

export const SearchContainer = () => {
  const [searchQuery, setSearchquery] = useState('')
  const { loading, error, data} = useProductListQuery({
    variables: {filter: {search: searchQuery}, first: 100}
});
  let results: any = [];
  if (data) {
    results = data.products?.edges.map(({node}) => {
      return {
        otherData: {
          saved: false,
          status: "Incoming Stock",
        },
        productData: node
      }
    }) || []
  }
  return ( 
    <div className="m-3">
      <Row>
        <Col xs={1} className="d-flex align-items-center">
          <SearchFilters />
        </Col>
        <Col>
          <SearchBar updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}}/>
          <SearchResults loading={loading} searchResultsData={results}/>
        </Col>
      </Row>
    </div>
  )
}