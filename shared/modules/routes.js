// modules/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import Page from './Page';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/:page" component={Page}>
      <Route path="/:page/:photo" component={Page} />
    </Route>
  </Route>
);

