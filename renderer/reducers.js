import { combineReducers } from 'redux';

import homeReducer from '@containers/Home/reducer';
import previewReducer from '@containers/Preview/reducer';
import liveReducer from '@containers/Live/reducer';
import scoreboardReducer from '@containers/Scoreboard/reducer';
import standingsReducer from '@containers/Standings/reducer';
import settingsReducer from '@containers/Settings/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  preview: previewReducer,
  live: liveReducer,
  scoreboard: scoreboardReducer,
  standings: standingsReducer,
  settings: settingsReducer,
});

export default rootReducer;
