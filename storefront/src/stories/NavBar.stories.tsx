import React from 'react';
import { Story, Meta } from '@storybook/react';

import { NavBar, NavBarProps } from '../components/NavBar/NavBar';

export default {
  title: 'Nav Bar',
  component: NavBar
} as Meta;

const Template: Story<NavBarProps> = (args) => <NavBar {...args} />;

export const Header = Template.bind({});
Header.args = {};
