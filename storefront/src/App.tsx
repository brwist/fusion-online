import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { NavBar } from './components/NavBar/NavBar';
import {HomePage} from './components/HomePage/HomePage'

import './App.scss';


function App() {
    return(
     <BrowserRouter>
        <Switch>
          <Route exact path ="/">
            <HomePage />
          </Route>
          <Route exact path="/search">
            <NavBar />
            <Container>
              <SearchContainer />
            </Container>
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
