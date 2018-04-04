import R from 'ramda';
import NBAClient from 'nba-stats-client';
import NBA from 'nba.js';

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
  R.omit(['data'], NBA),
  R.prop('data', NBA),
  NBAClient,
]);
