import React from 'react';
import { Form } from 'react-bootstrap';

import './searchfilters.scss';

export interface SearchFiltersProps {}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  ...props
}) => {
  return (
    <div className="search-filters">
      <Form>
        <div className="filter-heading">
          Brand
        </div>
        <ul className="filter-group list-unstyled">
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="first-checkbox"
              label="Label Here"
            />
          </li>
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="second-checkbox"
              label="Label Here"
            />
          </li>
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="third-checkbox"
              label="Label Here"
            />
          </li>
        </ul>

        <div className="filter-heading">
          Type
        </div>
        <ul className="filter-group list-unstyled">
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="fourth-checkbox"
              label="Label Here"
            />
          </li>
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="fifth-checkbox"
              label="Label Here"
            />
          </li>
          <li>
            <Form.Check
              custom
              type="checkbox"
              id="sixth-checkbox"
              label="Label Here"
            />
          </li>
        </ul>
      </Form>
    </div>
  );
};
