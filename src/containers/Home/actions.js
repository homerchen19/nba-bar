import R from 'ramda';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';
import format from 'date-fns/format';
import moment from 'moment-timezone';

import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  SET_DATE,
} from './constants';
import nba from '../../utils/nba';
import getApiDate from '../../utils/getApiDate';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

const setDate = payload => ({
  type: SET_DATE,
  payload,
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

const getValidTime = R.pipe(
  R.insert(4, '-'),
  R.insert(7, '-'),
  R.insert(10, ' '),
  R.insert(13, ':'),
  R.join('')
);

const pickEssentialProps = gameData => ({
  id: gameData.id,
  season: getSeason(gameData.date),
  time: gameData.time,
  state: gameData.state,
  city: gameData.city,
  arena: gameData.arena,
  home: gameData.home,
  visitor: gameData.visitor,
  periodTime: {
    periodStatus:
      gameData.period_time.game_status === '1'
        ? format(
            moment.tz(
              getValidTime(`${gameData.date}${gameData.time}`),
              'America/New_York'
            ),
            'HH:mm A'
          )
        : gameData.period_time.period_status,
    gameClock: gameData.period_time.game_clock,
    gameStatus: gameData.period_time.game_status,
  },
  playoffs: gameData.playoffs,
});

export const updateScheduleDataByGameId = (date, gameId) => async (
  dispatch,
  getState
) => {
  try {
    const apiDate = getApiDate(date);

    const {
      sports_content: { game: _gameData },
    } = await nba.getBoxScore(apiDate, gameId);
    const {
      home: { scheduleData: _scheduleData },
    } = getState();

    const gameData = pickEssentialProps(_gameData);
    const scheduleData = R.map(data => {
      if (R.propSatisfies(id => R.equals(id, gameId), 'id', data)) {
        return gameData;
      }

      return data;
    }, _scheduleData);

    dispatch(requestSuccess({ scheduleData }));
  } catch (error) {
    dispatch(requestError());
  }
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

  dispatch(setDate({ date: newDate }));

  try {
    const apiDate = getApiDate(newDate);

    const {
      sports_content: {
        games: { game: gamesData },
      },
    } = await nba.getGames(apiDate);

    const scheduleData = R.map(pickEssentialProps, gamesData);

    dispatch(requestSuccess({ scheduleData }));
  } catch (error) {
    dispatch(requestError());
  }
};
