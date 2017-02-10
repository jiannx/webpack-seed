import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, hashHistory } from 'react-router';

// components
import Home from './pages/home.jsx';
import Analysis from './pages/analysis.jsx';
import Cdn from './pages/cdn.jsx';
import Network from './pages/network.jsx';

// reducer
import home from './pages/home-reducer.js';


const reducer = combineReducers({
  home: home
});

const store = createStore(reducer);

const routes = {
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'home', component: Home },
    { path: 'analysis', component: Analysis },
    { path: 'cdn', component: Cdn },
    { path: 'network', component: Network },
  ]
};

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
), document.getElementById('app'));
