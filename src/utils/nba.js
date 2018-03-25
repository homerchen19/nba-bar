import R from 'ramda';
import NBA from 'nba';
import NBAClient from 'nba-stats-client';

const essentialMethods = [
  'getGamesFromDate',
  'getBoxScoreFromDate',
  'getPlayByPlayFromDate',
  'teamSplits',
];

const pickEssentialMethods = obj => R.pick(essentialMethods, obj);

export default R.compose(R.mergeAll, R.map(pickEssentialMethods))([
  R.omit(['stats'], NBA),
  R.prop('stats', NBA),
  NBAClient,
]);
