import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import './searchbar.scss';

export interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({
  ...props
}) => {
  return (
    <div className="search-bar">
      <Form>
        <Form.Group controlId="search-products" className="m-0">
          <Form.Label className="sr-only">Search by Part Name, Number or Keyword</Form.Label>
          <Form.Control type="search" placeholder="Search by Part Name, Number or Keyword" />
        </Form.Group>

        <button type="submit" className="search-submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Form>
    </div>
  );
};
