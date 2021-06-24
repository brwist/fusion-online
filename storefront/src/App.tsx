import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './components/HomePage/HomePage';

import './App.scss';


function App() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path ="/">
            <NavBar />
            <HomePage />
          </Route>
          <Route exact path="/search">
            <NavBar />
            <SearchContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
