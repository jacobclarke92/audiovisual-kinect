import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import CoreApp from './CoreApp';
import { viewportResize } from '../actions/ViewportActions';
import { effectAdd, effectChange } from '../actions/EffectActions';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const redux = finalCreateStore(reducer);

window.addEventListener('resize', () => redux.dispatch(viewportResize(window.innerWidth, window.innerHeight)));
redux.dispatch(viewportResize(window.innerWidth, window.innerHeight));

redux.dispatch(effectAdd('fakeEffect'));
redux.dispatch(effectChange('fakeEffect'));

export default class App extends Component {

  render() {
    return (
      <div>
        <Provider store={redux}>
          {() => <CoreApp />}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={redux} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }

}
