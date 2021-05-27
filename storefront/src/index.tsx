import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SaleorProvider } from "@saleor/sdk";
 
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
    <SaleorProvider config={config} apolloConfig={apolloConfig}>
      <App />
    </SaleorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
