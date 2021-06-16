import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {useAuth, useProductList} from '@saleor/sdk'
import './App.scss';

import { SearchContainer } from './components/SearchContainer/SearchContainer';


function App() {
  const productList = useProductList({first:10})

    return( 
      <BrowserRouter>
        <Switch>
          <Route path="/search">
            <SearchContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
