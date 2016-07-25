import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import promise from 'redux-promise'
import reducers from './reducers'
import App from './app'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const container = document.querySelector('.container')

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
), container)
