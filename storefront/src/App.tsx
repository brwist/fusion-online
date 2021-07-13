import React, { useState } from 'react';
import { useAuth } from "@saleor/sdk";
import { Switch, Route, useLocation} from 'react-router-dom';

import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { ProductDetail } from './components/ProductDetail/ProductDetail'
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './components/HomePage/HomePage';
import { useAccountConfirmationMutation} from './generated/graphql'
import { CategoryPage } from './components/CategoryPage/CategoryPage'
import {AccountPage} from './components/MyAccount/AccountPage'

import './App.scss';

function App() {
  const [errors, setErrors] = useState()
  const { authenticated, user, signIn, signOut, registerAccount, resetPasswordRequest } = useAuth();
  const handleSignIn = async (email: string, password: string) => {
    const { data, dataError } = await signIn(email, password);

    if (dataError) {
      /**
       * Unable to sign in.
       **/
      setErrors(dataError.error);
      console.log("Sign In Error:", dataError);
    } else if (data) {
      /**
       * User signed in successfully.
       **/
      console.log("Sign In Successful:", data);
    }
  };

  const handleRegistration = async (email: string, password: string) => {
    const {data, dataError} = await registerAccount(email, password, 'http://localhost:3000/')
    return dataError ? { data: dataError} : {data}
  }
  const search = useLocation()?.search
  const email = new URLSearchParams(search)?.get('email')
  const token = new URLSearchParams(search)?.get('token')
  const [confirmAccount, {data}] = useAccountConfirmationMutation({
  })

  if (email && token) {
    confirmAccount({
      variables: { email, token}
    })
    if (data?.confirmAccount?.errors.length === 0) {
      console.log('Account confirmed')
    } else {
      console.error(data?.confirmAccount?.errors)
    }
  }

  return(
      authenticated && user ? (
          <>
          <NavBar signOut={signOut} />
          <Switch>
            <Route exact path="/search" component={SearchContainer} />
            <Route exact path="/products/:id" component={ProductDetail} />
<<<<<<< HEAD
            <Route exact path="/categories/:id" component={CategoryPage} />
=======
            <Route exact path="/account">
              <AccountPage
                signOut={signOut}
                user={user}
              />
            </Route>
>>>>>>> e289e1d8fe4f7bf603fa4160ec3fc06f2e2fa5e1
          </Switch>
          </>
        ): (
          <HomePage 
            handleSignIn={handleSignIn}
            handleRegistration={handleRegistration}
            errors={errors}/>
        )
  );
}

export default App;
