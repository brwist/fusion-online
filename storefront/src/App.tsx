import React from 'react';
import {useAuth, useProductList} from '@saleor/sdk'
import './App.scss';

import SearchForm from './components/Search/SearchForm'


function App() {
  const { authenticated, user, signIn } = useAuth();
 
  const handleSignIn = async () => {
    const { data, dataError } = await signIn("admin@example.com", "admin");
 
    if (dataError) {
      /**
       * Unable to sign in.
       **/
    } else if (data) {
      /**
       * User signed in succesfully.
       **/
    }
  };

  const productList = useProductList({first:10})
 
  if (authenticated && user) {
    return( 
      <div style={{margin: '30px'}}>
        <span>Signed in as {user.email}</span>
        <h2>Products</h2>
        <ol>{productList.data?.map(product => <li key={product.id}>{product.name}</li>)}</ol>
        <h2>Search</h2>
        <SearchForm />
      </div>
    );
  } else {
    return <button onClick={handleSignIn}>Sign in</button>;
  }
}

export default App;
