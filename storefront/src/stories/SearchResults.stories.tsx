import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchResults, SearchResultsProps } from '../components/SearchResults/SearchResults';
import {productDataSample} from './productDataSample'

export default {
  title: 'Search/Search Results Table',
  component: SearchResults
} as Meta;

const Template: Story<SearchResultsProps> = (args) => <SearchResults {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
searchResultsData: [
    {otherData: {saved: false, status: "Incoming Stock"},
      productData: productDataSample
    },
    {otherData: {saved: true, status: "Incoming Stock"},
      productData: productDataSample
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      productData: productDataSample
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      productData: productDataSample
    },
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
