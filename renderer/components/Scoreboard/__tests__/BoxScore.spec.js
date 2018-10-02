import React from 'react';
import renderer from 'react-test-renderer';

import BoxScore from '../BoxScore';

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
  expect(BoxScore).toBeDefined();
});

it('match snapshot', () => {
  const props = {
    home: {
      name: 'IND',
      players: [
        {
          assists: '2',
          blocks: '1',
          field_goals_attempted: '13',
          field_goals_made: '11',
          first_name: 'Bojan',
          fouls: '3',
          free_throws_attempted: '0',
          free_throws_made: '0',
          jersey_number: '44',
          last_name: 'Bogdanovic',
          minutes: '30',
          on_court: '0',
          person_id: '202711',
          player_code: 'bojan_bogdanovic',
          plus_minus: '30',
          points: '28',
          position_full: 'Forward',
          position_short: 'F',
          rebounds_defensive: '3',
          rebounds_offensive: '0',
          seconds: '29',
          starting_position: 'SF',
          steals: '1',
          team_turnovers: '',
          three_pointers_attempted: '7',
          three_pointers_made: '6',
          turnovers: '2',
        },
      ],
    },
    visitor: {
      name: 'GSW',
      players: [
        {
          assists: '7',
          blocks: '1',
          field_goals_attempted: '23',
          field_goals_made: '8',
          first_name: 'Kevin',
          fouls: '3',
          free_throws_attempted: '9',
          free_throws_made: '9',
          jersey_number: '35',
          last_name: 'Durant',
          minutes: '32',
          on_court: '0',
          person_id: '201142',
          player_code: 'kevin_durant',
          plus_minus: '-17',
          points: '27',
          position_full: 'Forward',
          position_short: 'F',
          rebounds_defensive: '5',
          rebounds_offensive: '0',
          seconds: '56',
          starting_position: 'SF',
          steals: '3',
          team_turnovers: '',
          three_pointers_attempted: '10',
          three_pointers_made: '2',
          turnovers: '4',
        },
      ],
    },
  };
  const tree = renderer.create(<BoxScore {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
