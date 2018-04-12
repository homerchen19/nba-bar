import React from 'react';
import renderer from 'react-test-renderer';

import Error from '../Error';

it('be defined', () => {
  expect(Error).toBeDefined();
});

it('match snapshot', () => {
  window.require = jest.fn(() => ({
    remote: {
      app: { hide: jest.fn() },
    },
    shell: {
      openExternal: jest.fn(),
    },
  }));

  const tree = renderer.create(<Error />).toJSON();

  expect(tree).toMatchSnapshot();
});
