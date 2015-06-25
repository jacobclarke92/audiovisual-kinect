import _ from 'lodash';
import Immutable from 'immutable';
import Effects from '../effects/index';


let effectList = _.keys(Effects);
let effects = Immutable.Map();
let currentEffect = null;

for(let effectName of effectList) {
	currentEffect = new Effects[effectName]();
	effects = effects.set(effectName, currentEffect);
}

export function getEffectList() {
	return effectList;
}

export function getEffect(effectName) {
	return effects.get(effectName);
}

export function getFirstEffect() {
	return effects.get(effectList[0]);
}