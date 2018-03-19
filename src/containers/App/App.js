import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Home from '../Home';
import Settings from '../Settings';

const App = () => (
  <div>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

export default hot(module)(App);
