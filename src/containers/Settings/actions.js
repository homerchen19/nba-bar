import { SET_PATH } from './constants';

export function setPath(path) {
  return {
    type: SET_PATH,
    path,
  };
}
