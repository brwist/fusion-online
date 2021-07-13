import React, {useState } from 'react';
import { Form } from 'react-bootstrap';

import './productfilters.scss';
import {useInitialProductFilterDataQuery, AttributeInput} from '../../generated/graphql';

export interface ProductFiltersProps {
  setFilters(filters: AttributeInput[]): void,
  categoryId?: string
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  setFilters, categoryId
}) => {
  const { loading, error, data} = useInitialProductFilterDataQuery({
    variables: {categories: categoryId ? [categoryId] : [], collections: [], productTypes: [], inCategory: categoryId }
  });
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
        ({values, slug}) => !(slug === event.currentTarget.name && values?.includes(event.currentTarget.value))));
      setFilters(currentFilters.filter(
        ({values, slug}) => !(slug === event.currentTarget.name && values?.includes(event.currentTarget.value))));
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error retrieving product filters</p>;
  if (data) {
    return (
      <div className="search-filters">
        <Form>
          {data.attributes?.edges.map(({node: {id, name, slug, values}}) => {
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
