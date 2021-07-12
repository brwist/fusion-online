import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import { ProductFilters, ProductFiltersProps } from '../components/ProductFilters/ProductFilters';

export default {
  title: 'Products/Product Filters',
  component: ProductFilters
} as Meta;

const Template: Story<ProductFiltersProps> = (args) => <ApolloProvider client={new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache()
})}><ProductFilters {...args} /></ApolloProvider>;

export const Default = Template.bind({});
Default.args = {};
