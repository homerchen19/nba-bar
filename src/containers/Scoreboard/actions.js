import R from 'ramda';

import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

const pickEssentialProps = R.pick(['home', 'visitor']);

export const fetchData = (date, gameData) => async dispatch => {
  dispatch(requestStart());

  try {
    const {
      sports_content: { game: _gameBoxScoreData },
    } = await nba.getBoxScoreFromDate(date, gameData.id);

    const gameBoxScoreData = pickEssentialProps(_gameBoxScoreData);

    dispatch(requestSuccess({ gameBoxScoreData }));
  } catch (error) {
    dispatch(requestError());
  }
};
