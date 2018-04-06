import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../Spinner';

it('be defined', () => {
  expect(Spinner).toBeDefined();
});

it('match snapshot', () => {
  const tree = renderer.create(<Spinner />).toJSON();

  expect(tree).toMatchSnapshot();
});
