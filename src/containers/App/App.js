import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from '../Home';
import Preview from '../Preview';
import Settings from '../Settings';

const App = () => (
  <main style={{ height: '100%' }}>
    <Switch>
      <Route path="/preview/:gameId" component={Preview} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Home} />
    </Switch>
  </main>
);

export default hot(module)(App);
