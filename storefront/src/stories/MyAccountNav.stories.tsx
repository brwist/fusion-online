import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MyAccountNav, MyAccountNavProps } from '../components/MyAccount/MyAccountNav';

export default {
  title: 'My Account Nav',
  component: MyAccountNav
} as Meta;

const Template: Story<MyAccountNavProps> = (args) => <MyAccountNav {...args} />;

export const Nav = Template.bind({});
Nav.args = {};
