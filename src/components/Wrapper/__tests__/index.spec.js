import React from 'react';
import renderer from 'react-test-renderer';

import Wrapper from '..';

it('be defined', () => {
  expect(Wrapper).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    currentTab: 1,
    history: {
      push: jest.fn(),
    },
  };
  const tree = renderer.create(<Wrapper {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
