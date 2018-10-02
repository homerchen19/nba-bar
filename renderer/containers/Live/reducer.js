import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  LIVE_START,
  LIVE_SUCCESS,
  LIVE_ERROR,
} from './constants';

const initialState = {
  live: 'loading',
  error: false,
  loading: true,
  gameBoxScoreData: {},
  gamePlayByPlayData: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...state,
        live: 'success',
        error: false,
        loading: false,
        gameBoxScoreData: action.payload.gameBoxScoreData,
        gamePlayByPlayData: action.payload.gamePlayByPlayData,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    case LIVE_START: {
      return {
        ...state,
        live: 'loading',
      };
    }
    case LIVE_SUCCESS: {
      return {
        ...state,
        live: 'success',
        gameBoxScoreData: action.payload.gameBoxScoreData,
        gamePlayByPlayData: action.payload.gamePlayByPlayData,
      };
    }
    case LIVE_ERROR: {
      return {
        ...state,
        live: 'error',
      };
    }
    default:
      return state;
  }
}
