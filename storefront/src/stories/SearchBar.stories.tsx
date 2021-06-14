import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchBar, SearchBarProps } from '../components/SearchBar/SearchBar';

export default {
  title: 'Search Bar',
  component: SearchBar
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Form = Template.bind({});
Form.args = {};
