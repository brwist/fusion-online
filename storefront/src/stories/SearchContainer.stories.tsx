import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchContainer, SearchContainerProps } from '../components/SearchContainer/SearchContainer';

export default {
  title: 'Search/Search Container',
  component: SearchContainer
} as Meta;

const Template: Story<SearchContainerProps> = (args) => <SearchContainer {...args} />;

export const Default = Template.bind({});
Default.args = {};
