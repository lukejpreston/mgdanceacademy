import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import clone from 'clone'

import registerServiceWorker from './registerServiceWorker'
import App from './app'
import reducer from './reducer'
import actions from './actions'
import './index.css'

const Container = connect(reducer, actions)(App)

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    app: (state = {}) => clone(state),
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path='*' component={Container} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
