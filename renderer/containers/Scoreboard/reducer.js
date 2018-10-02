import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';

const initialState = {
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
    default:
      return state;
  }
}
