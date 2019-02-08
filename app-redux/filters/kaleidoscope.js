import ExtraFilters from '../../app/filters/index';

export default class rgbSplit {
	getParamDefaults() {
		return [
			{type: 'range', group: false, name: 'sides', label: 'Sides', value: 0, min: 0, max: 24, step: 1},
			{type: 'range', group: false, name: 'angle', label: 'Angle', value: 0, min: 0, max: 360, step: 1},
		];
	}
	constructor() {
		this.filter = new ExtraFilters.KaleidoscopeFilter();
	}
	update(params) {
		this.filter.sides = this.getParamValue(params, 'sides');
		console.log(this.filter);
	}
	getParamValue(params, value) {
		return params.filter(param => param.name == value)[0].value;
	}
}	