import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Login, LoginProps } from '../components/Forms/Login';

export default {
  title: 'Login Form',
  component: Login
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Form = Template.bind({});
Form.args = {};
