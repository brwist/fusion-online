import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Register, RegisterProps } from '../components/Forms/Register';

export default {
  title: 'Register Form',
  component: Register
} as Meta;

const Template: Story<RegisterProps> = (args) => <Register {...args} />;

export const Form = Template.bind({});
Form.args = {};
