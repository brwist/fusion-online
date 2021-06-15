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
              <div style={{margin: '30px'}}>
            <h2>Products</h2>
            <ol>{productList.data?.map(product => <li key={product.id}>{product.name}</li>)}</ol>
            <SearchContainer />
          </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
