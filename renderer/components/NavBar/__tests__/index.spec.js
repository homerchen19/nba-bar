import React from 'react';
import renderer from 'react-test-renderer';

import NavBar from '..';

it('be defined', () => {
  expect(NavBar).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    page: 'PAGE',
  };
  const tree = renderer.create(<NavBar {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
