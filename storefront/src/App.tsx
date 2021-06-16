import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import { SearchContainer } from './components/SearchContainer/SearchContainer';


function App() {
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
