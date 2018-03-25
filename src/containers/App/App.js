import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from '../Home';
import Preview from '../Preview';
import Scoreboard from '../Scoreboard';
import Settings from '../Settings';

const App = () => (
  <main style={{ height: '100%' }}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/preview/:gameId" component={Preview} />
      <Route path="/scoreboard/:gameId" component={Scoreboard} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </main>
);

export default hot(module)(App);
