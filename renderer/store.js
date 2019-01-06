import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const middleware = [thunk, logger];

const enhancers = compose(
  applyMiddleware(...middleware),
  typeof window !== 'undefined' &&
    window.devToolsExtension &&
    process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension()
    : f => f
);

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, enhancers);

  return store;
}
