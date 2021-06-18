import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap';
import {SearchResults} from '../SearchResults/SearchResults';
import {SearchBar} from '../SearchBar/SearchBar';
import {useProductListQuery, AttributeInput} from '../../generated/graphql'
import {SearchFilters} from '../SearchFilters/SearchFilters'


export interface SearchContainerProps {};

export const SearchContainer = () => {
  const [searchQuery, setSearchquery] = useState('')
  const [attributes, setAttributes] = useState<Array<AttributeInput>>([])
  const { loading, error, data} = useProductListQuery({
    variables: {filter: {search: searchQuery, attributes: attributes}, first: 100}
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
    <div className="my-3">
      <Row>
        <Col xs={2}>
          <SearchFilters setFilters={(filters: AttributeInput[]) => {setAttributes(filters)}}/>
        </Col>
        <Col>
          <SearchBar updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}}/>
          <SearchResults loading={loading} searchResultsData={results}/>
        </Col>
      </Row>
    </div>
  )
}
