import R from 'ramda';
import NBAClient from 'nba-stats-client';
import NBA from 'nba.js';

const essentialMethods = [
  'getGamesFromDate',
  'getBoxScoreFromDate',
  'getPlayByPlayFromDate',
  'teamSplits',
  'teams',
  'conferenceStandings',
];

const pickEssentialMethods = R.pick(essentialMethods);

export default R.compose(R.mergeAll, R.map(pickEssentialMethods))([
  R.omit(['stats', 'data'], NBA),
  R.prop('stats', NBA),
  R.prop('data', NBA),
  NBAClient,
]);
