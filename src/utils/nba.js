import R from 'ramda';
import { getGames, getBoxScore, getPlayByPlay } from 'nba-stats-client';
import NBA from 'nba.js';

const NBAClient = {
  getGames,
  getBoxScore,
  getPlayByPlay,
};

const essentialMethods = [
  'getGames',
  'getBoxScore',
  'getPlayByPlay',
  'teamSplits',
  'teams',
  'conferenceStandings',
];

const pickEssentialMethods = R.pick(essentialMethods);

export default R.compose(
  R.mergeAll,
  R.map(pickEssentialMethods)
)([
  R.omit(['stats', 'data'], NBA),
  R.prop('stats', NBA),
  R.prop('data', NBA),
  NBAClient,
]);
