import React from 'react';
import renderer from 'react-test-renderer';

import Tab from '..';

it('be defined', () => {
  expect(Tab).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    titles: ['NBA', 'Bar'],
  };
  const tree = renderer
    .create(
      <Tab {...props}>
        <p>NBA Bar</p>
      </Tab>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
