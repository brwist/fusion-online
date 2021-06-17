import React from 'react';
import { Form } from 'react-bootstrap';

import './searchfilters.scss';
import {useInitialProductFilterDataQuery} from '../../generated/graphql';

export interface SearchFiltersProps {}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  ...props
}) => {
  const { loading, error, data} = useInitialProductFilterDataQuery({
    variables: {categories: [], collections: [], productTypes: [] }
  });
  const excludedFilters = ['ordering-code', 'spec-code', 'model'];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error retrieving product filters</p>;
  if (data) {
    const filters = data.attributes?.edges.filter(({node: {slug}}) => {
      return slug && !excludedFilters.includes(slug)});
    return (
      <div className="search-filters">
        <Form>
          {filters?.map(({node: {id, name, values}}) => {
            return (
              <React.Fragment key={id}>
                <div className="filter-heading">
                  {name}
                </div>
                <ul className="filter-group list-unstyled">
                  {values?.map((value) => {
                    return (
                      <li key={value?.id}>
                        <Form.Check
                          custom
                          type="checkbox"
                          id={value?.id}
                          label={value?.name}
                        />
                      </li>
                    )
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </Form>
      </div>
    );
  } else {
    return null
  }
};
