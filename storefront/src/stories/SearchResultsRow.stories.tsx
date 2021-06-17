import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchResultRow, SearchResultRowProps } from '../components/SearchResults/SearchResultRow';
import {productDataSample} from './productDataSample'

export default {
  title: 'Search/Search Results Row',
  component: SearchResultRow
} as Meta;

const Template: Story<SearchResultRowProps> = (args) => <SearchResultRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  otherData: {
    saved: false,
    status: "Incoming Stock",
  },
  productData: productDataSample
};

export const Saved = Template.bind({});
Saved.args = {
  otherData: {
    status: "Incoming Stock",
    saved: true
  },
  productData: productDataSample
};