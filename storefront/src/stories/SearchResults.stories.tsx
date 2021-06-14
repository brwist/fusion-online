import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchResults, SearchResultsProps } from '../components/SearchResults/SearchResults';

export default {
  title: 'Search Results',
  component: SearchResults
} as Meta;

const Template: Story<SearchResultsProps> = (args) => <SearchResults {...args} />;

export const Table = Template.bind({});
Table.args = {};
