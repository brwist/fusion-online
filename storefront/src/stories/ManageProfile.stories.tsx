import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ManageProfile, ManageProfileProps } from '../components/MyAccount/ManageProfile';

export default {
  title: 'My Account Manage Profile',
  component: ManageProfile
} as Meta;

const Template: Story<ManageProfileProps> = (args) => <ManageProfile {...args} />;

export const Page = Template.bind({});
Page.args = {};
