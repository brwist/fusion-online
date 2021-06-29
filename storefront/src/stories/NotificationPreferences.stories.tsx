import React from 'react';
import { Story, Meta } from '@storybook/react';

import { NotificationPreferences, NotificationPreferencesProps } from '../components/Forms/NotificationPreferences';

export default {
  title: 'Notification Preferences Form',
  component: NotificationPreferences
} as Meta;

const Template: Story<NotificationPreferencesProps> = (args) => <NotificationPreferences {...args} />;

export const Form = Template.bind({});
Form.args = {};
