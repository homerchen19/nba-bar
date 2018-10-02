import React from 'react';
import renderer from 'react-test-renderer';

import LineScore from '../LineScore';

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
  expect(LineScore).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    home: {
      name: 'IND',
      score: '126',
      linescores: [
        {
          period_name: 'Q1',
          period_value: '1',
          score: '27',
        },
        {
          period_name: 'Q2',
          period_value: '2',
          score: '35',
        },
        {
          period_name: 'Q3',
          period_value: '3',
          score: '35',
        },
        {
          period_name: 'Q4',
          period_value: '4',
          score: '29',
        },
      ],
    },
    visitor: {
      name: 'GSW',
      score: '106',
      linescores: [
        {
          period_name: 'Q1',
          period_value: '1',
          score: '26',
        },
        {
          period_name: 'Q2',
          period_value: '2',
          score: '25',
        },
        {
          period_name: 'Q3',
          period_value: '3',
          score: '26',
        },
        {
          period_name: 'Q4',
          period_value: '4',
          score: '29',
        },
      ],
    },
  };
  const tree = renderer.create(<LineScore {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
