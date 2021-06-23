import React, {useState} from 'react';
import { useAuth } from "@saleor/sdk";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { NavBar } from './components/NavBar/NavBar';
import {HomePage} from './components/HomePage/HomePage'

import './App.scss';


function App() {
  const [errors, setErrors] = useState()
  const { authenticated, user, signIn, signOut } = useAuth();
  const handleSignIn = async (email: string, password: string) => {
    const { data, dataError } = await signIn(email, password);

    if (dataError) {
      /**
       * Unable to sign in.
       **/
      setErrors(dataError.error)
      console.log("Sign In Error:", dataError)
    } else if (data) {
      /**
       * User signed in successfully.
       **/
      console.log("Sign In Successful:", data)
    }
  };

  return(
      authenticated && user ? (
        <BrowserRouter>
          <NavBar signOut={signOut}/>
          <Switch>
            <Route exact path="/search" component={SearchContainer}/>
          </Switch>
        </BrowserRouter>
        ): (
          <HomePage handleSignIn={handleSignIn} errors={errors}/>
        )
  );
}

export default App;
