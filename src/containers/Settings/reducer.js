import { SET_PATH } from './constants';

const initialState = {
  path: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
}
