import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';

const initialState = {
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
    default:
      return state;
  }
}
