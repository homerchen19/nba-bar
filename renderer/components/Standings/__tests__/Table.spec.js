import React from 'react';
import renderer from 'react-test-renderer';

import Table from '../Table';

const realMath = Object.create(global.Math);

beforeAll(() => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;
});

afterAll(() => {
  global.Math = realMath;
});

it('be defined', () => {
  expect(Table).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    east: [
      {
        gamesBehind: '0',
        loss: '22',
        name: 'TOR',
        teamId: '1610612761',
        win: '56',
        winPct: '.718',
      },
      {
        gamesBehind: '3',
        loss: '25',
        name: 'BOS',
        teamId: '1610612738',
        win: '53',
        winPct: '.679',
      },
      {
        gamesBehind: '7.5',
        loss: '30',
        name: 'CLE',
        teamId: '1610612739',
        win: '49',
        winPct: '.620',
      },
    ],
    west: [
      {
        gamesBehind: '0',
        loss: '15',
        name: 'HOU',
        teamId: '1610612745',
        win: '64',
        winPct: '.810',
      },
      {
        gamesBehind: '7',
        loss: '22',
        name: 'GSW',
        teamId: '1610612744',
        win: '57',
        winPct: '.722',
      },
      {
        gamesBehind: '16',
        loss: '31',
        name: 'POR',
        teamId: '1610612757',
        win: '48',
        winPct: '.608',
      },
    ],
  };
  const tree = renderer.create(<Table {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
