import React, {useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import './searchbar.scss';

export interface SearchBarProps {
  /**
   * handler from searchContainer that sets the searchQuery
   */
  updateSearchQuery?(searchString: string): void
  initialSearchQuery?: string | null
  closeSearchModal?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  updateSearchQuery, initialSearchQuery, closeSearchModal
}) => {
  const history = useHistory();
  const [searchString, setSearchString] = useState(initialSearchQuery || "")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value)
    updateSearchQuery && updateSearchQuery(event.currentTarget.value)
  }

  return (
    <div className="search-bar">
      <Form onSubmit={(e) => {
        e.preventDefault()
        history.push(`/search?q=${encodeURI(searchString)}`)
        closeSearchModal && closeSearchModal()
      }}>
        <Form.Group controlId="search-products" className="m-0">
          <Form.Label className="sr-only">Search by Part Name, Number or Keyword</Form.Label>
          <Form.Control 
            type="search"
            value={searchString}
            placeholder="Search by Part Name, Number or Keyword" 
            onChange={handleChange}
          />
        </Form.Group>

        <button type="submit" className="search-submit" onClick={
          (e) => {
            e.preventDefault()
            history.push(`/search?q=${searchString}`)
            closeSearchModal && closeSearchModal()
          }
        }>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Form>
    </div>
  );
};
