import React, { useState } from 'react';

import SearchResults from './SearchResults'
import AdvancedSearchResults from './AdvancedSearchResults'
import ProductFilters from './ProductFilters'
import {AttributeInput} from './generated/graphql'

const SearchForm = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState(<></>)
    const [attributeFilters, setAttributeFilters] = useState<Array<AttributeInput>>([])
    const [categoryFilters, setCategoryFilters] = useState([])

    const attributeFilterHandler = (attributes: AttributeInput[]) => {
        setAttributeFilters(attributes)
    }

    return (
        <div>
            <ProductFilters attributeFilterHandler={attributeFilterHandler}/>
            <form 
                onSubmit={(event: React.FormEvent) =>{
                    event.preventDefault()
                    setSearchResults(
                        <AdvancedSearchResults filter={{search: searchQuery, attributes: attributeFilters}} />
                    )
                }}
            >
                <input 
                    value={searchQuery}
                    type="text"
                    onChange={(event: React.FormEvent<HTMLInputElement>): void => {
                        setSearchQuery(event.currentTarget.value);
                    }}
                />
                <input type="submit" value="Submit" />
            </form>
            {searchResults}
        </div>
    );
};

export default SearchForm;