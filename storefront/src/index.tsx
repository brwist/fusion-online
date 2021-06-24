import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SaleorProvider } from "@saleor/sdk";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache()
});
 
const config = { apiUrl: "http://localhost:8000/graphql/" };
const apolloConfig = {
  /* 
    Optional custom Apollo client config.
    Here you may append custom Apollo cache, links or the whole client. 
    You may also use import { createSaleorCache, createSaleorClient, createSaleorLinks } from "@saleor/sdk" to create semi-custom implementation of Apollo.
  */
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <SaleorProvider config={config} apolloConfig={apolloConfig}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </SaleorProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
