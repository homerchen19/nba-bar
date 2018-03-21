import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  ADD_DAY,
  SUB_DAY,
} from './constants';

const initialState = {
  date: Date.now(),
  loading: false,
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
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_DAY: {
      return {
        ...state,
        date: action.payload.date,
      };
    }
    case SUB_DAY:
      return {
        ...state,
        date: action.payload.date,
      };
    default:
      return state;
  }
}
