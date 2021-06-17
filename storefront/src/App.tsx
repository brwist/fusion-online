import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { NavBar } from './components/NavBar/NavBar'


function App() {
    return( 
      <BrowserRouter>
        <Switch>
          <Route path="/search">
            <NavBar />
            <SearchContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
