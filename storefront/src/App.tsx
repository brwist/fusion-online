import React, { useState } from 'react';
import { useAuth, useCart } from '@saleor/sdk';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { NavBar } from './components/NavBar/NavBar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { CategoryPage } from './components/CategoryPage/CategoryPage';
import { HomePage } from './components/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { AccountPage } from './components/MyAccount/AccountPage';
import { Cart } from './components/Cart/Cart';
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage';
import { CartReview } from './components/CartReview/CartReview';
import { RegistrationConfirmationPage } from './components/RegistrationConfirmationPage/RegistrationConfirmationPage';
import { ResetPasswordForm } from './components/Forms/ResetPasswordForm';
import './App.scss';

import { useMutation } from '@apollo/client';
import { CONFIRM_ACCOUNT } from './graphql/account';

import { Alert, Container } from 'react-bootstrap';

type AccountConfirmMutation = {
  confirmAccount: {
    errors: Array<{
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

type AlertState = {
  show: boolean;
  message?: string;
  variant?: string;
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
  const [showAlert, setShowAlert] = useState<AlertState>({
    show: false,
    message: 'Your email has been confirmed! Please log in.',
    variant: 'primary',
  });
  const [confirming, setConfirming] = useState<Boolean>(false);
  const location = useLocation();
  const history = useHistory();
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
      handleCloseConfirmation();
    }
  };

  const handleRegistration = async (email: string, password: string) => {
    const { data, dataError } = await registerAccount(email, password, 'http://localhost:3000/');
    return dataError ? { data: dataError } : { data };
  };

  const search = useLocation()?.search;
  const email = new URLSearchParams(search)?.get('email');
  const token = new URLSearchParams(search)?.get('token');
  const passwordUpdated = new URLSearchParams(search)?.get('password-updated');
  const [confirmAccount, confirmAccountData] = useMutation<AccountConfirmMutation>(CONFIRM_ACCOUNT, {});

  if (location.pathname === "/" && email && token && !confirming) {
    setConfirming(true);
    confirmAccount({
      variables: { email, token },
    });
  }

  if (confirming) {
    if (confirmAccountData?.data?.confirmAccount?.errors.length === 0) {
      console.log('Account confirmed');
      if (!showAlert.show) {
        setShowAlert({ show: true, message: 'Your email has been confirmed! Please log in.', variant: 'primary' });
      }
    } else {
      console.error('confirm errors', confirmAccountData?.data?.confirmAccount?.errors);
    }
  }

  if (location.pathname === "/" && passwordUpdated === "true") {
    if (!showAlert.show) {
      setShowAlert({ show: true, message: 'Your password has been updated! Please log in.', variant: 'primary' });
    }
  }


  const handleCloseConfirmation = () => {
    setConfirming(false);
    let queryParams = new URLSearchParams(location.search);
    queryParams.delete('email');
    queryParams.delete('token');
    history.replace({
      search: queryParams.toString(),
    });
    setShowAlert({ show: false });
  };

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
        <Route exact path="/checkout">
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
        {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
      </Switch>
      <Footer />
    </>
  ) : (
    <>
      <Alert
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
        show={showAlert.show}
        variant={showAlert.variant}
        dismissible
        onClose={handleCloseConfirmation}
      >
        <Container>
          <Alert.Heading>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">RocketChips</strong>
          </Alert.Heading>
          <p>{showAlert.message}</p>
        </Container>
      </Alert>
      <Switch>
        <Route exact path="/registration-confirmation">
          <RegistrationConfirmationPage />
        </Route>
        <Route exact path="/password-reset">
          <ResetPasswordForm />
        </Route>
        <Route path="/">
          <LoginPage handleSignIn={handleSignIn} handleRegistration={handleRegistration} errors={errors} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
