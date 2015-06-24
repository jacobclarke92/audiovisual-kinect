
import _ from 'lodash';
import Effects from '../effects/index';

let currentEffect = null;

export default class EffectController {

	constructor() {
		this.effectList = _.keys(Effects);
		console.log(this.effectList)
	}

	getEffectList() {
		return this.effectList;
	}

	loadEffect(effectName) {

		if(!effectName) effectName = this.effectList[0];
		console.log('Loading effect: ' + effectName);

		currentEffect = new Effects[effectName](); 
		return currentEffect.getEffectRequirements();
	}

}