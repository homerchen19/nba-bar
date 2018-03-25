import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = gameBoxScoreData => ({
  type: REQUEST_SUCCESS,
  payload: { gameBoxScoreData },
});

export const fetchData = (date, gameData) => async dispatch => {
  dispatch(requestStart());

  try {
    const {
      sports_content: { game: gameBoxScoreData },
    } = await nba.getBoxScoreFromDate(date, gameData.id);

    dispatch(requestSuccess(gameBoxScoreData));
  } catch (error) {
    dispatch(requestError());
  }
};
