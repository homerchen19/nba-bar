import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';

const initialState = {
  loading: true,
  homeTeamDashboardData: {},
  visitorTeamDashboardData: {},
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
        homeTeamDashboardData: action.payload.homeTeamDashboardData,
        visitorTeamDashboardData: action.payload.visitorTeamDashboardData,
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
