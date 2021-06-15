import React from 'react';
import { Table } from 'react-bootstrap';

import {SearchResultRow, SearchResultRowProps} from './SearchResultRow'

import './searchresults.scss';

export interface SearchResultsProps {
  loading: boolean,
  searchResultsData: Array<SearchResultRowProps>
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  loading, searchResultsData
}) => {

  if (loading) {
    return <h5 className="search-results">Loading...</h5>
  }
  
  if (searchResultsData?.length === 0) {
    return <h5 className="search-results">No Results</h5>
  }
  return (
    <div className="search-results">
      <Table striped borderless responsive>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th className="text-center">Status</th>
            <th className="text-center">Qty Available</th>
            <th className="text-center">Price Per Unit</th>
            <th className="text-center">Order/RFQ</th>
          </tr>
        </thead>
        <tbody>
          {searchResultsData?.map(({otherData, productData}) => {
            return (
              <SearchResultRow
                key={productData.id}
                otherData={otherData}
                productData={productData}
              />
            )
          })}
        </tbody>
      </Table>
    </div>
  );
};
