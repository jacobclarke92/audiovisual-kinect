import _ from 'lodash';
import Immutable from 'immutable';
import PIXI from 'pixi.js/bin/pixi';

import * as AppActions from '../actions/AppActions';
import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Effects from '../effects/index';
import ParamStore from './Params';


let effectList = _.keys(Effects);
let effects = Immutable.Map();

let currentEffect = null;
let currentEffectName = null;

//~~~~ set effect prefs to localstorage if it exsists

for(let effectName of effectList) {
	currentEffect = new Effects[effectName]();
	effects = effects.set(effectName, currentEffect);
}

currentEffect = null;

AppDispatcher.register(function(payload) {
 
  switch(payload.type) {

  	case ActionTypes.EFFECT_CHANGED:

  		console.log('Effect change intercepted by EffectStore', payload);
  		if(effectList.indexOf(payload.data.effectName) === -1) {
  			console.log('Effect name "'+payload.data.effectName+'" not in effect list', effectList);
  			return false;
  		}
  		console.log(payload.data.effectName+' DOES exist in effect list');

  		if(currentEffect) currentEffect.didUnmount();

  		currentEffectName = payload.data.effectName;
  		currentEffect = effects.get(currentEffectName);
  		currentEffect.stage = new PIXI.Container();

  		currentEffect.didMount();

  		// AppActions.effectMounted(payload.data);


  		let currentEffectParams = currentEffect.getParamDefaults();
		for(let i in currentEffectParams) {
			currentEffectParams[i].family = 'Effect';
			currentEffectParams[i].effectName = currentEffectName;
		}
  		ParamStore.addEffectParams(currentEffectParams);

  		break;

  	default:
  		return true;
  }

  ParamStore.emitChange();
  return true;

});

export function getEffectList() {
	return effectList;
}

/*
export function getEffect(effectName) {
	return effects.get(effectName);
}

export function getFirstEffect() {
	return effects.get(effectList[0]);
}

export function getEffectParams(effectName) {
	return effectParams.get(effectName);
}

export function getEffectParam(effectName, paramName) {
	return effectParams.getIn([effectName, paramName]);
}

export function getEffectParamValue(effectName, paramName) {
	return effectParams.getIn([effectName, paramName, 'value']);
}

export function getAllEffectParams() {
	return Immutable.toJS(effectParams);
}

*/
export function getCurrentEffectParams() {
	return ParamStore.getEffectParams(currentEffectName);
}

export function getCurrentEffectRequirements() {
	return currentEffect.getEffectRequirements();
}

export function getCurrentEffectStage() {
	return currentEffect.stage;
}

export function renderCurrentEffect() {
	currentEffect.render();
}