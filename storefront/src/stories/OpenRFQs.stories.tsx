import React from 'react';
import { Story, Meta } from '@storybook/react';

import { OpenRFQs, OpenRFQsProps } from '../components/MyAccount/OpenRFQs';

export default {
  title: 'My Account Open RFQs',
  component: OpenRFQs
} as Meta;

const Template: Story<OpenRFQsProps> = (args) => <OpenRFQs {...args} />;

export const Table = Template.bind({});
Table.args = {};
