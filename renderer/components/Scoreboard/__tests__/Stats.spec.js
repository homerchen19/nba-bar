import React from 'react';
import renderer from 'react-test-renderer';

import Stats from '../Stats';

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
  expect(Stats).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    home: {
      name: 'IND',
      stats: {
        assists: '32',
        blocks: '3',
        field_goals_attempted: '93',
        field_goals_made: '50',
        field_goals_percentage: '53.8',
        fouls: '24',
        free_throws_attempted: '15',
        free_throws_made: '11',
        free_throws_percentage: '73.3',
        full_timeout_remaining: '2',
        points: '126',
        rebounds_defensive: '34',
        rebounds_offensive: '13',
        short_timeout_remaining: '0',
        steals: '11',
        team_fouls: '21',
        team_rebounds: '6',
        team_turnovers: '1',
        technical_fouls: '1',
        three_pointers_attempted: '29',
        three_pointers_made: '15',
        three_pointers_percentage: '51.7',
        turnovers: '12',
      },
    },
    visitor: {
      name: 'GSW',
      stats: {
        assists: '29',
        blocks: '5',
        field_goals_attempted: '83',
        field_goals_made: '37',
        field_goals_percentage: '44.6',
        fouls: '14',
        free_throws_attempted: '24',
        free_throws_made: '23',
        free_throws_percentage: '95.8',
        full_timeout_remaining: '2',
        points: '106',
        rebounds_defensive: '26',
        rebounds_offensive: '13',
        short_timeout_remaining: '0',
        steals: '6',
        team_fouls: '12',
        team_rebounds: '2',
        team_turnovers: '0',
        technical_fouls: '0',
        three_pointers_attempted: '29',
        three_pointers_made: '9',
        three_pointers_percentage: '31.0',
        turnovers: '16',
      },
    },
  };
  const tree = renderer.create(<Stats {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
