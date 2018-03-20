import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from '../Home';
import Settings from '../Settings';

const App = () => (
  <Switch>
    <Route path="/settings" component={Settings} />
    <Route path="/" component={Home} />
  </Switch>
);

export default hot(module)(App);
