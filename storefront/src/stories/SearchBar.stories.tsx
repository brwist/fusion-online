import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchBar, SearchBarProps } from '../components/SearchBar/SearchBar';

export default {
  title: 'Search/Search Bar',
  component: SearchBar,
  argTypes: { onChange: {action: 'clicked'} }
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
};
