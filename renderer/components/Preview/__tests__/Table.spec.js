import React from 'react';
import renderer from 'react-test-renderer';

import Table from '../Table';

it('be defined', () => {
  expect(Table).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    home: {
      gp: 78,
      w: 48,
      l: 30,
      pts: 109.1,
      fg_pct: 0.47,
      fg3_pct: 0.367,
      ft_pct: 0.754,
      oreb: 10.8,
      dreb: 36.4,
      reb: 47.2,
      ast: 26.8,
      blk: 5.1,
      stl: 8.2,
      tov: 16.7,
      pf: 22.2,
      plus_minus: 4,
    },
    visitor: {
      gp: 79,
      w: 49,
      l: 30,
      pts: 110.6,
      fg_pct: 0.477,
      fg3_pct: 0.371,
      ft_pct: 0.781,
      oreb: 8.4,
      dreb: 33.7,
      reb: 42.1,
      ast: 23.4,
      blk: 3.9,
      stl: 7.1,
      tov: 13.7,
      pf: 18.7,
      plus_minus: 1,
    },
  };
  const tree = renderer.create(<Table {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
