import { combineReducers } from 'redux';
import settingsReducer from 'containers/Settings/reducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export default rootReducer;
