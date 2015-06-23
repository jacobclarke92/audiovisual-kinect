
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
		console.log('Loading effect: ' + effectName);

		let currentEffect = new Effects[effectName]();
		console.log(currentEffect);
	}

}