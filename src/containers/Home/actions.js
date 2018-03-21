import R from 'ramda';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';

import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  SET_DATE,
} from './constants';

import nba from '../../utils/nba';

const requestStart = () => ({ type: REQUEST_START });
const requestSuccess = () => ({ type: REQUEST_SUCCESS });
const requestError = () => ({ type: REQUEST_ERROR });

const setDate = date => ({
  type: SET_DATE,
  payload: { date },
});

export const fetchData = (date, type) => async dispatch => {
  dispatch(requestStart());

  let newDate;

  R.ifElse(
    R.equals('today'),
    () => {
      newDate = date;
    },
    R.ifElse(
      R.equals('add'),
      () => {
        newDate = getTime(addDays(date, 1));
      },
      () => {
        newDate = getTime(subDays(date, 1));
      }
    )
  )(type);

  dispatch(setDate(newDate));

  try {
    const {
      sports_content: { games: { game: gamesData } },
    } = await nba.getGamesFromDate(newDate);

    console.log('=====================================');
    console.log(gamesData);
    console.log('=====================================');

    dispatch(requestSuccess());
  } catch (error) {
    dispatch(requestError());
  }
};
