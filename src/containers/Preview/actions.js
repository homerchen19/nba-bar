import R from 'ramda';

import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

const pickEssentialProps = R.pick([
  'gp',
  'w',
  'l',
  'pts',
  'fg_pct',
  'fg3_pct',
  'ft_pct',
  'oreb',
  'dreb',
  'reb',
  'ast',
  'blk',
  'stl',
  'tov',
  'pf',
  'plus_minus',
]);

export const fetchData = gameData => async dispatch => {
  dispatch(requestStart());

  try {
    const {
      OverallTeamDashboard: [_homeTeamDashboardData],
    } = await nba.teamSplits({
      Season: gameData.season,
      TeamID: gameData.home.id,
    });

    const {
      OverallTeamDashboard: [_visitorTeamDashboardData],
    } = await nba.teamSplits({
      Season: gameData.season,
      TeamID: gameData.visitor.id,
    });

    dispatch(
      requestSuccess({
        homeTeamDashboardData: pickEssentialProps(_homeTeamDashboardData),
        visitorTeamDashboardData: pickEssentialProps(_visitorTeamDashboardData),
      })
    );
  } catch (error) {
    dispatch(requestError());
  }
};
