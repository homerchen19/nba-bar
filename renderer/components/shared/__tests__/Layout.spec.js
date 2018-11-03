import React from 'react';
import renderer from 'react-test-renderer';

import Layout from '../Layout';

it('be defined', () => {
  expect(Layout).toBeDefined();
});

it('match snapshot', () => {
  const tree = renderer.create(<Layout />).toJSON();

  expect(tree).toMatchSnapshot();
});
