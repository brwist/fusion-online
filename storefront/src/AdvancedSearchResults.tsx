import React from 'react';

import {useProductListQuery, ProductListQueryVariables} from './generated/graphql'

const AdvancedSearchResults = ({filter}: ProductListQueryVariables) => {
    const { loading, error, data} = useProductListQuery({
        variables: {filter: filter, first: 100}
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

export default AdvancedSearchResults;