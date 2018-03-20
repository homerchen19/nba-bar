import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';

import { ADD_DAY, SUB_DAY } from './constants';

const initialState = {
  date: Date.now(),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_DAY:
      return {
        ...state,
        date: getTime(addDays(action.payload.date, 1)),
      };
    case SUB_DAY:
      return {
        ...state,
        date: getTime(subDays(action.payload.date, 1)),
      };
    default:
      return state;
  }
}
