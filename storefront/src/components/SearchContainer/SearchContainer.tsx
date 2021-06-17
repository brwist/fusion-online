import React, {useState} from 'react'

import {SearchResults} from '../SearchResults/SearchResults';
import {SearchBar} from '../SearchBar/SearchBar';
import {useProductListQuery, ProductListQueryVariables} from '../../generated/graphql'


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
          brand: "Intel",
          sku: 123456, 
          specCode: 1234,
          orderingCode: 1234,
          status: "Incoming Stock",
          qtyAvailable: 10000,
          price: 100.00
        },
        productData: node
      }
    }) || []
  }
  return ( 
    <div>
      <SearchBar updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}}/>
      <SearchResults loading={loading} searchResultsData={results}/>
    </div>
  )
}