import React from 'react';
import {useSearchResultsQuery, SearchResultsQueryVariables} from '../../generated/graphql'

const SearchResults = ({query}: SearchResultsQueryVariables) => {
    const { loading, error, data} = useSearchResultsQuery({
        variables: {query: query}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    if (data) {
      const products = data.products?.edges || [];
      return (
        <div>
          {products?.length > 0 &&
            products.map(({ node: { id, name} }) => (
              <div key={id}>
                <p>{name}</p>
              </div>
            )) || <p>No results</p>}
        </div>
      );
    } 
  
  return null
};

export default SearchResults;