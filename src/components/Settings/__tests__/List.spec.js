import React from 'react';
import renderer from 'react-test-renderer';

import List from '../List';

it('be defined', () => {
  expect(List).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    quit: jest.fn(),
  };
  const tree = renderer.create(<List {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
