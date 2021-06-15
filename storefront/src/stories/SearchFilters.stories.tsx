import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchFilters, SearchFiltersProps } from '../components/SearchFilters/SearchFilters';

export default {
  title: 'Search Filters',
  component: SearchFilters
} as Meta;

const Template: Story<SearchFiltersProps> = (args) => <SearchFilters {...args} />;

export const Filters = Template.bind({});
Filters.args = {};
