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

  let results;
  if (data) {
    results = data.products?.edges || [];
  }
  return ( 
    <div>
      <SearchBar updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}}/>
      <SearchResults loading={loading} searchResultsData={[]}/>
    </div>
  )
}