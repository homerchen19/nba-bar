import React from 'react';
import renderer from 'react-test-renderer';

import TeamScore from '../TeamScore';

it('be defined', () => {
  expect(TeamScore).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    arena: 'Bankers Life Fieldhouse',
    city: 'Indianapolis',
    gameStatus: 'Final',
    home: {
      name: 'IND',
      score: '126',
    },
    visitor: {
      name: 'GSW',
      score: '106',
    },
    winner: 'home',
  };
  const tree = renderer.create(<TeamScore {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
