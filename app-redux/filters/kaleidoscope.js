import ExtraFilters from '../../app/filters/index';

export default class rgbSplit {
	getParamDefaults() {
		return [
			{type: 'range', group: false, name: 'slices', label: 'Slices', value: 0, min: 0, max: 24, step: 1},
			{type: 'range', group: false, name: 'angle', label: 'Angle', value: 0, min: 0, max: 360, step: 1},
		];
	}
	constructor() {
		this.filter = new ExtraFilters.KaleidoscopeFilter();
		return this.filter;
	}
}