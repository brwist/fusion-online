import React, { useState } from 'react';
import { useAuth, useCart } from '@saleor/sdk';
import { Switch, Route, useLocation } from 'react-router-dom';

import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { NavBar } from './components/NavBar/NavBar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { CategoryPage } from './components/CategoryPage/CategoryPage';
import { HomePage } from './components/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { AccountPage } from './components/MyAccount/AccountPage';
import { Cart } from './components/Cart/Cart';
import { CartReview } from './components/CartReview/CartReview';

import './App.scss';

import { useMutation } from '@apollo/client';
import { CONFIRM_ACCOUNT } from './config';

type AccountConfirmMutation = {
  confirmAccount: {
    errors: Array<{
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

function App() {
  const [errors, setErrors] = useState();
  const { authenticated, user, signIn, signOut, registerAccount } = useAuth();
  const {
    addItem,
    discount,
    items,
    removeItem,
    shippingPrice,
    subtotalPrice,
    totalPrice,
    updateItem,
    subtractItem,
  } = useCart();
  const handleSignIn = async (email: string, password: string) => {
    const { data, dataError } = await signIn(email, password);

    if (dataError) {
      /**
       * Unable to sign in.
       **/
      setErrors(dataError.error);
      console.log('Sign In Error:', dataError);
    } else if (data) {
      /**
       * User signed in successfully.
       **/
      console.log('Sign In Successful:', data);
    }
  };

  const handleRegistration = async (email: string, password: string) => {
    const { data, dataError } = await registerAccount(email, password, 'http://localhost:3000/');
    return dataError ? { data: dataError } : { data };
  };
  const search = useLocation()?.search;
  const email = new URLSearchParams(search)?.get('email');
  const token = new URLSearchParams(search)?.get('token');
  const [confirmAccount, { data }] = useMutation<AccountConfirmMutation>(CONFIRM_ACCOUNT, {});

  if (email && token) {
    confirmAccount({
      variables: { email, token },
    });
    if (data?.confirmAccount?.errors.length === 0) {
      console.log('Account confirmed');
    } else {
      console.error(data?.confirmAccount?.errors);
    }
  }

  return authenticated && user ? (
    <>
      <NavBar signOut={signOut} cartItemsNum={items?.length || 0} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search">
          <SearchContainer addItem={addItem} />
        </Route>
        <Route exact path="/products/:slug">
          <ProductDetail addItem={addItem} />
        </Route>
        <Route exact path="/categories/:slug">
          <CategoryPage addItem={addItem} />
        </Route>
        <Route exact path="/cart">
          <Cart
            discount={discount}
            items={items}
            removeItem={removeItem}
            shippingPrice={shippingPrice}
            subtotalPrice={subtotalPrice}
            totalPrice={totalPrice}
            updateItem={updateItem}
            subtractItem={subtractItem}
          />
        </Route>
        <Route exact path="/cart/review">
          <CartReview
            discount={discount}
            items={items}
            removeItem={removeItem}
            shippingPrice={shippingPrice}
            subtotalPrice={subtotalPrice}
            totalPrice={totalPrice}
            updateItem={updateItem}
            subtractItem={subtractItem}
          />
        </Route>
        <Route path="/account/:slug">
          <AccountPage signOut={signOut} user={user} />
        </Route>
      </Switch>
      <Footer />
    </>
  ) : (
    <LoginPage handleSignIn={handleSignIn} handleRegistration={handleRegistration} errors={errors} />
  );
}

export default App;
