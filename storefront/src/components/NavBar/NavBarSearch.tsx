import React, { ReactFragment, useState } from 'react';
import { Link } from 'react-router-dom';

import {SearchBar } from '../SearchBar/SearchBar';
import { useProductListQuery } from '../../generated/graphql';

import './navbar.scss';

export interface NavBarSearchProps {
  closeSearchModal: () => void
};

export const NavBarSearch: React.FC<NavBarSearchProps> = ({
  closeSearchModal
}) => {
  const [searchQuery, setSearchquery] = useState('');
  const { loading, error, data} = useProductListQuery({
    variables: {filter: {search: searchQuery, isPublished: true}, first: 10}
  });

  let searchSuggestions: ReactFragment = (
    <div className="default-text my-4">
      Easily search for products by Part Name, Brand, Number, Family, Type or Code.
    </div>
  )

  if (searchQuery !== "" && data) {
    searchSuggestions = (
      <div className="search-suggestions my-4">
        {data?.products?.edges.map(({node}) => {
          return (
            <div key={node.id} className="mb-4">
              <Link to={`/products/${node.slug}`} onClick={closeSearchModal}>
                {node.name}
              </Link>
            </div>
          )})}
        {data?.products?.edges.length === 0 && (
          <p>No Results</p>
        )}
      </div>
    )
  } else if (loading) {
    searchSuggestions = (
      <div className="search-suggestions my-4">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="search-box">
      <SearchBar closeSearchModal={closeSearchModal} initialSearchQuery={searchQuery} updateSearchQuery={(searchString) => { return (setSearchquery(searchString))}}/>
      {searchSuggestions}
    </div>
  )
}