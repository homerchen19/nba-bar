import React from 'react';
import renderer from 'react-test-renderer';

import PlayByPlay from '../PlayByPlay';

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
  expect(PlayByPlay).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    gamePlayByPlayData: [
      {
        event: '0',
        clock: '',
        description: 'Start Period',
        player_code: '',
        person_id: '',
        home_score: '0',
        visitor_score: '0',
        team_abr: '',
        period: '1',
      },
      {
        event: '1',
        clock: '',
        description: 'Jump Ball Adams vs Duncan (Green gains possession)',
        player_code: 'steven_adams',
        person_id: '203500',
        home_score: '0',
        visitor_score: '0',
        team_abr: 'OKC',
        period: '1',
      },
      {
        event: '2',
        clock: '11:43',
        description: '[OKC] Adams Foul: Shooting (1 PF) (2 FTA) (B Spooner)',
        player_code: 'steven_adams',
        person_id: '203500',
        home_score: '0',
        visitor_score: '0',
        team_abr: 'OKC',
        period: '1',
      },
    ],
  };
  const tree = renderer.create(<PlayByPlay {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
