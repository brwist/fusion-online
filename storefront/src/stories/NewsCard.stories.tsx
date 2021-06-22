import React from 'react';
import { Story, Meta } from '@storybook/react';

import { NewsCard, NewsCardProps } from '../components/NewsCard/NewsCard';

export default {
  title: 'News Card',
  component: NewsCard
} as Meta;

const Template: Story<NewsCardProps> = (args) => <NewsCard {...args} />;

export const Card = Template.bind({});
Card.args = {
  date: 'Sept 16, 2022',
  title: 'This is a News Card',
  text: 'Some quick example text to build on the card title and make up the bulk of the card content.',
  buttonSize: '',
  buttonVariant: 'primary',
  buttonLabel: 'Read More'
};
