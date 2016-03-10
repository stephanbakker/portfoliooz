// modules/routes.js
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import Page from './Page';

module.exports = React.createElement(
  Route,
  { path: '/', component: App },
  React.createElement(IndexRoute, { component: Home }),
  React.createElement(Route, { path: '/:page', component: Page })
);