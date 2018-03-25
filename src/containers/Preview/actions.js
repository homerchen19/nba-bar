import R from 'ramda';

import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = ({
  homeTeamDashboardData,
  visitorTeamDashboardData,
}) => ({
  type: REQUEST_SUCCESS,
  payload: { homeTeamDashboardData, visitorTeamDashboardData },
});

const pickEssentialProps = R.pick([
  'gp',
  'w',
  'l',
  'pts',
  'fgPct',
  'fg3Pct',
  'ftPct',
  'oreb',
  'dreb',
  'reb',
  'ast',
  'blk',
  'stl',
  'tov',
  'pf',
  'plusMinus',
]);

export const fetchData = gameData => async dispatch => {
  dispatch(requestStart());

  try {
    const {
      overallTeamDashboard: [_homeTeamDashboardData],
    } = await nba.teamSplits({
      Season: gameData.season,
      TeamID: gameData.home.id,
    });

    const {
      overallTeamDashboard: [_visitorTeamDashboardData],
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
