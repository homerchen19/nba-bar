import R from 'ramda';

import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  LIVE_START,
  LIVE_SUCCESS,
  LIVE_ERROR,
} from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});
const liveStart = () => ({ type: LIVE_START });
const liveSuccess = payload => ({ type: LIVE_SUCCESS, payload });
const liveError = () => ({ type: LIVE_ERROR });

const pickEssentialProps = R.pick(['home', 'visitor']);

export const fetchData = ({ date, gameId, firstCall }) => async dispatch => {
  if (firstCall) {
    dispatch(requestStart());
  } else {
    dispatch(liveStart());
  }

  try {
    const {
      sports_content: { game: _gameBoxScoreData },
    } = await nba.getBoxScoreFromDate(date, gameId);
    const {
      sports_content: { game: { play: gamePlayByPlayData } },
    } = await nba.getPlayByPlayFromDate(date, gameId);

    const gameBoxScoreData = pickEssentialProps(_gameBoxScoreData);

    if (firstCall) {
      dispatch(requestSuccess({ gameBoxScoreData, gamePlayByPlayData }));
    } else {
      dispatch(liveSuccess({ gameBoxScoreData, gamePlayByPlayData }));
    }
  } catch (error) {
    console.error(error);
    if (firstCall) {
      dispatch(requestError());
    } else {
      dispatch(liveError());
    }
  }
};
