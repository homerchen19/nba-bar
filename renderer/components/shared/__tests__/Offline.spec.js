import React from 'react';
import renderer from 'react-test-renderer';

import Offline from '../Offline';

it('be defined', () => {
  expect(Offline).toBeDefined();
});

it('match snapshot', () => {
  const tree = renderer.create(<Offline />).toJSON();

  expect(tree).toMatchSnapshot();
});
