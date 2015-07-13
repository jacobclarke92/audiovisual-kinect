import _ from 'lodash';
import Immutable from 'immutable';
import PIXI from 'pixi.js/bin/pixi';
import * as StoreUtils from '../utils/StoreUtils';

import * as AppActions from '../actions/AppActions';
import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Effects from '../effects/index';
import ParamStore from './Params';


let effectList = _.keys(Effects);
let effects = Immutable.Map();

let currentEffect = null;
for(let effectName of effectList) {
	currentEffect = new Effects[effectName]();
	effects = effects.set(effectName, currentEffect);
}


const EffectStore = StoreUtils.createStore({

  getList() {
  	return effectList;
  },

  get(effectName) {
  	return effects.get(effectName);
  },

  getFirst() {
  	return effects.get(effectList[0]);
  }

});

export default EffectStore;