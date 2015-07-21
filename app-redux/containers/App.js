import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import CoreApp from './CoreApp';
import { viewportResize } from '../actions/ViewportActions';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

window.addEventListener('resize', () => store.dispatch(viewportResize(window.innerWidth, window.innerHeight)));
store.dispatch(viewportResize(window.innerWidth, window.innerHeight));

export default class App extends Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <CoreApp />}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }

}
