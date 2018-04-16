import R from 'ramda';
import getTime from 'date-fns/get_time';
import moment from 'moment-timezone';

import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

const pickEssentialProps = R.pick(['home', 'visitor']);

export const fetchData = ({ date, gameId }) => async dispatch => {
  dispatch(requestStart());

  try {
    const apiDate = getTime(
      moment
        .tz(date, 'America/New_York')
        .startOf('day')
        .format()
    );

    const {
      sports_content: { game: _gameBoxScoreData },
    } = await nba.getBoxScoreFromDate(apiDate, gameId);
    const {
      sports_content: { game: { play: gamePlayByPlayData } },
    } = await nba.getPlayByPlayFromDate(apiDate, gameId);

    const gameBoxScoreData = pickEssentialProps(_gameBoxScoreData);

    dispatch(requestSuccess({ gameBoxScoreData, gamePlayByPlayData }));
  } catch (error) {
    dispatch(requestError());
  }
};
