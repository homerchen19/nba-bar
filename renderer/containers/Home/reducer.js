import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  SET_DATE,
} from './constants';

const initialState = {
  date: new Date().getTime(),
  loading: true,
  scheduleData: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        scheduleData: action.payload.scheduleData,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        scheduleData: [],
      };
    }
    case SET_DATE:
      return {
        ...state,
        date: action.payload.date,
      };
    default:
      return state;
  }
}
