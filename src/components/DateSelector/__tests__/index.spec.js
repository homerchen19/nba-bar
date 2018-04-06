import React from 'react';
import renderer from 'react-test-renderer';

import DateSelector from '../index';

it('be defined', () => {
  expect(DateSelector).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    date: 1522984495289,
    addDay: jest.fn(),
    subDay: jest.fn(),
  };
  const tree = renderer.create(<DateSelector {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
