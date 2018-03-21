import R from 'ramda';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';
import moment from 'moment-timezone';

import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  ADD_DAY,
  SUB_DAY,
} from './constants';

import nba from '../../utils/nba';

export const requestStart = () => ({ type: REQUEST_START });
export const requestSuccess = () => ({ type: REQUEST_SUCCESS });
export const requestError = () => ({ type: REQUEST_ERROR });

export const addDay = date => ({
  type: ADD_DAY,
  payload: { date: getTime(addDays(date, 1)) },
});

export const subDay = date => ({
  type: SUB_DAY,
  payload: { date: getTime(subDays(date, 1)) },
});

export const fetchData = (date, type) => async dispatch => {
  dispatch(requestStart());

  R.ifElse(
    R.equals('add'),
    () => dispatch(addDay(date)),
    () => dispatch(subDay(date))
  )(type);

  const LADate = moment
    .tz(date, 'America/Los_Angeles')
    .startOf('day')
    .format();

  try {
    const {
      sports_content: { games: { game: gamesData } },
    } = await nba.getGamesFromDate(LADate);

    console.log('=====================================');
    console.log(gamesData);
    console.log('=====================================');

    dispatch(requestSuccess());
  } catch (error) {
    dispatch(requestError());
  }
};
