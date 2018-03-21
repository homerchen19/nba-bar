import R from 'ramda';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';

import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  TODAY,
  ADD_DAY,
  SUB_DAY,
} from './constants';

import nba from '../../utils/nba';

export const requestStart = () => ({ type: REQUEST_START });
export const requestSuccess = () => ({ type: REQUEST_SUCCESS });
export const requestError = () => ({ type: REQUEST_ERROR });

export const today = date => ({
  type: TODAY,
  payload: { date },
});

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
    R.equals('today'),
    () => dispatch(today(date)),
    R.ifElse(
      R.equals('add'),
      () => dispatch(addDay(date)),
      () => dispatch(subDay(date))
    )
  )(type);

  try {
    const {
      sports_content: { games: { game: gamesData } },
    } = await nba.getGamesFromDate(date);

    console.log('=====================================');
    console.log(gamesData);
    console.log('=====================================');

    dispatch(requestSuccess());
  } catch (error) {
    dispatch(requestError());
  }
};
