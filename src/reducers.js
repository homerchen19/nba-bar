import { combineReducers } from 'redux';

import settingsReducer from './containers/Settings/reducer';
import homeReducer from './containers/Home/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  settings: settingsReducer,
});

export default rootReducer;
