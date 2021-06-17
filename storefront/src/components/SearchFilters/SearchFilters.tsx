import React, {useState, useEffect, ReactEventHandler, SyntheticEvent} from 'react';
import { Form } from 'react-bootstrap';

import './searchfilters.scss';
import {useInitialProductFilterDataQuery, AttributeInput} from '../../generated/graphql';

export interface SearchFiltersProps {
  setFilters(filters: AttributeInput[]): void
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  setFilters
}) => {
  const { loading, error, data} = useInitialProductFilterDataQuery({
    variables: {categories: [], collections: [], productTypes: [] }
  });
  const excludedFilters = ['ordering-code', 'spec-code', 'model'];
  const [currentFilters, setCurrentFilters] = useState<Array<AttributeInput>>([])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setCurrentFilters([
        ...currentFilters,
        {slug: event.currentTarget.name,
          values: [event.currentTarget.value]
        }])
      setFilters([
        ...currentFilters,
        {slug: event.currentTarget.name,
          values: [event.currentTarget.value]
        }])
    } else {
      setCurrentFilters(currentFilters.filter(
        ({slug}) => slug !== event?.currentTarget.name));
      setFilters(currentFilters.filter(
        ({slug}) => slug !== event?.currentTarget.name))
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error retrieving product filters</p>;
  if (data) {
    const filters = data.attributes?.edges.filter(({node: {slug}}) => {
      return slug && !excludedFilters.includes(slug)});
    return (
      <div className="search-filters">
        <Form>
          {filters?.map(({node: {id, name, slug, values}}) => {
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
                          value={value?.slug || 'undefined'}
                          name={slug|| 'undefined'}
                          label={value?.name}
                          onChange={onChangeHandler}
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
