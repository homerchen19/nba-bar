import React from 'react';
import renderer from 'react-test-renderer';

import TeamScore from '../TeamScore';

it('be defined', () => {
  expect(TeamScore).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    arena: 'Wells Fargo Center',
    city: 'Philadelphia',
    date: 1522998000000,
    time: '7:00 pm ET',
    home: {
      l: 30,
      name: 'PHI',
      w: 48,
    },
    visitor: {
      l: 30,
      name: 'CLE',
      w: 49,
    },
  };
  const tree = renderer.create(<TeamScore {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
