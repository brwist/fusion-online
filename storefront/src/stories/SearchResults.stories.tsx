import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchResults, SearchResultsProps } from '../components/SearchResults/SearchResults';
import * as SearchResultRowStories from './SearchResultsRow.stories';

export default {
  title: 'Search/Search Results Table',
  component: SearchResults
} as Meta;

const Template: Story<SearchResultsProps> = (args) => <SearchResults {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  searchResultsData: [
    // {result: {...SearchResultRowStories.Default.args?.result, sku: 123}},
    // {result: {...SearchResultRowStories.Saved.args?.result, sku: 456}},
    // {result: {...SearchResultRowStories.Default.args?.result, sku: 789}},
    // {result: {...SearchResultRowStories.Default.args?.result, sku: 1234}}
  ]
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};

export const Empty = Template.bind({});
Empty.args = {
  loading: false,
  searchResultsData: []
};
