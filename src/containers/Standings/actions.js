import R from 'ramda';

import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';
import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

export const fetchData = () => async dispatch => {
  dispatch(requestStart());

  try {
    const conferenceStandings = await nba.conferenceStandings({
      date: 'current',
    });

    const standingsData = R.path(
      ['league', 'standard', 'conference'],
      conferenceStandings
    );

    dispatch(requestSuccess({ standingsData }));
  } catch (error) {
    dispatch(requestError());
  }
};
