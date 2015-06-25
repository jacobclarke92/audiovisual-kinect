import _ from 'lodash';
import Immutable from 'immutable';

import Effects from '../effects/index';


let effectList = _.keys(Effects);
let effects = Immutable.Map();

for(let effectName of effectList) {
	effects = effects.set(effectName, new Effects[effectName]());
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