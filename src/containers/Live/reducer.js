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
  loading: true,
  gameBoxScoreData: {},
  gamePlayByPlayData: [],
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
        live: 'success',
        loading: false,
        gameBoxScoreData: action.payload.gameBoxScoreData,
        gamePlayByPlayData: action.payload.gamePlayByPlayData,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
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
