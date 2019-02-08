import PIXI from 'pixi.js/bin/pixi';
import { createSelector } from 'reselect';

export default class rgbSplit {
	getParamDefaults() {
		return [
			{type: 'range', group: false, name: 'amount', label: 'Amount', value: 10, min: 0, max: 50, step: 0.5},
			{type: 'range', group: 'details', name: 'redX', label: 'Red Offset X', value: -1, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'greenX', label: 'Green Offset X', value: 0, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'blueX', label: 'Blue Offset X', value: 1, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'redY', label: 'Red Offset Y', value: 0, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'greenY', label: 'Green Offset Y', value: 0, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'blueY', label: 'Blue Offset Y', value: 0, min: -5, max: 5, step: 1},
		];
	}
	constructor() {
		this.filter = new PIXI.filters.RGBSplitFilter();
	}
	update(params) {
		const amount = 	this.getParamValue(params, 'amount');
		this.filter.red.x = 	amount * this.getParamValue(params, 'redX');
		this.filter.green.x = 	amount * this.getParamValue(params, 'greenX');
		this.filter.blue.x = 	amount * this.getParamValue(params, 'blueX');
		this.filter.red.y = 	amount * this.getParamValue(params, 'redY');
		this.filter.green.y = 	amount * this.getParamValue(params, 'greenY');
		this.filter.blue.y = 	amount * this.getParamValue(params, 'blueY');
		console.log(this.filter);
	}
	getParamValue(params, value) {
		return params.filter(param => param.name == value)[0].value;
	}
}