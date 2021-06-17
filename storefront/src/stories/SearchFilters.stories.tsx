import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import { SearchFilters, SearchFiltersProps } from '../components/SearchFilters/SearchFilters';

export default {
  title: 'Search/Search Filters',
  component: SearchFilters
} as Meta;

const Template: Story<SearchFiltersProps> = (args) => <ApolloProvider client={new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache()
})}><SearchFilters {...args} /></ApolloProvider>;

export const Default = Template.bind({});
Default.args = {};
