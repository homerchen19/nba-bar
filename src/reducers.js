import { combineReducers } from 'redux';

import homeReducer from './containers/Home/reducer';
import previewReducer from './containers/Preview/reducer';
import settingsReducer from './containers/Settings/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  preview: previewReducer,
  settings: settingsReducer,
});

export default rootReducer;
