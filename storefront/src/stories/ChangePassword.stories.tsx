import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChangePassword, ChangePasswordProps } from '../components/Forms/ChangePassword';

export default {
  title: 'Change Password Form',
  component: ChangePassword
} as Meta;

const Template: Story<ChangePasswordProps> = (args) => <ChangePassword {...args} />;

export const Form = Template.bind({});
Form.args = {};
