import { combineReducers } from 'redux';

import homeReducer from './containers/Home/reducer';
import previewReducer from './containers/Preview/reducer';
import scoreboardReducer from './containers/Scoreboard/reducer';
import settingsReducer from './containers/Settings/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  preview: previewReducer,
  scoreboard: scoreboardReducer,
  settings: settingsReducer,
});

export default rootReducer;
