import R from 'ramda';
import NBA from 'nba';
import NBAClient from 'nba-stats-client';
import NBAJS from 'nba.js';

const essentialMethods = [
  'getGamesFromDate',
  'getBoxScoreFromDate',
  'getPlayByPlayFromDate',
  'teamSplits',
  'conferenceStandings',
];

const pickEssentialMethods = obj => R.pick(essentialMethods, obj);

export default R.compose(R.mergeAll, R.map(pickEssentialMethods))([
  R.omit(['stats'], NBA),
  R.prop('stats', NBA),
  R.omit(['data'], NBAJS),
  R.prop('data', NBAJS),
  NBAClient,
]);
