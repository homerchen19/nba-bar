import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import NavBar from '..';

it('be defined', () => {
  expect(NavBar).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    page: 'PAGE',
  };
  const tree = renderer
    .create(
      <MemoryRouter>
        <NavBar {...props} />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
