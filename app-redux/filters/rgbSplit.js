import PIXI from 'pixi.js';

export default class rgbSplit {
	getParamDefaults() {
		return [
			{type: 'range', group: false, name: 'amount', label: 'Amount', value: 0, min: 0, max: 50, step: 0.5},
			{type: 'range', group: 'details', name: 'redX', label: 'Red Offset X', value: -1, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'greenX', label: 'Green Offset X', value: 0, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'blueX', label: 'Blue Offset X', value: 1, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'redY', label: 'Red Offset Y', value: -1, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'greenY', label: 'Green Offset Y', value: 0, min: -5, max: 5, step: 1},
			{type: 'range', group: 'details', name: 'blueY', label: 'Blue Offset Y', value: 1, min: -5, max: 5, step: 1},
		];
	}
	constructor() {
		this.filter = new PIXI.filters.RGBSplitFilter();
		return filter;
	}
}