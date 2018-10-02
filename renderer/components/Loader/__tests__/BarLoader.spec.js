import React from 'react';
import renderer from 'react-test-renderer';

import BarLoader from '../BarLoader';

it('be defined', () => {
  expect(BarLoader).toBeDefined();
});

it('match snapshot', () => {
  const tree = renderer.create(<BarLoader />).toJSON();

  expect(tree).toMatchSnapshot();
});
