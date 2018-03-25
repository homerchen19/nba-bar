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
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = scheduleData => ({
  type: REQUEST_SUCCESS,
  payload: { scheduleData },
});

const setDate = date => ({
  type: SET_DATE,
  payload: { date },
});

const getSeason = date => {
  let season = '';
  const year = date.slice(0, 4);
  const month = date.slice(5, 6);

  if (month > 9) {
    season = `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    season = `${year - 1}-${year.toString().slice(-2)}`;
  }

  return season;
};

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

    const scheduleData = R.map(
      gameData => ({
        id: gameData.id,
        season: getSeason(gameData.date),
        time: gameData.id,
        state: gameData.state,
        city: gameData.city,
        arena: gameData.arena,
        home: gameData.home,
        visitor: gameData.visitor,
        periodTime: {
          periodStatus: gameData.period_time.period_status,
          gameClock: gameData.period_time.game_clock,
          gameStatus: gameData.period_time.game_status,
        },
      }),
      gamesData
    );

    dispatch(requestSuccess(scheduleData));
  } catch (error) {
    dispatch(requestError());
  }
};
