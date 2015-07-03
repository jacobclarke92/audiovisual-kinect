import _ from 'lodash';
import Immutable from 'immutable';
import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Effects from '../effects/index';


let effectList = _.keys(Effects);
let effects = Immutable.Map();

let currentEffect = null;
let currentEffectParams = null;

let effectParams = Immutable.Map();

//~~~~ set effect prefs to localstorage if it exsists

for(let effectName of effectList) {
	currentEffect = new Effects[effectName]();
	effects = effects.set(effectName, currentEffect);

	currentEffectParams = currentEffect.getParamDefaults();
	effectParams = effectParams.set(effectName, Immutable.fromJS(currentEffectParams));
}

AppDispatcher.register(function(payload) {
	if(payload.type === ActionTypes.UPDATE_EFFECT_PARAM) {
		console.log('EffectStore intercepted param update', payload);
	}
});

export function getEffectList() {
	return effectList;
}

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