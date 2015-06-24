import Immutable from 'immutable';
import * as NumberUtils from '../utils/NumberUtils';

let palettes = Immutable.fromJS([
	{
		name: 'DaveJ_1',
		colors: [
			{hex: '#ED2972', rgb: [237, 41, 114]},
			{hex: '#EC1A41', rgb: [236, 26, 65]},
			{hex: '#D91D52', rgb: [217, 29, 82]},
			{hex: '#511346', rgb: [81, 19, 70]},
			{hex: '#8800F1', rgb: [136, 0, 241]},
		]
	},
	{
		name: 'DaveJ_2',
		colors: [
			{hex: '#3165A0', rgb: [49, 101, 160]},
			{hex: '#27A3A5', rgb: [39, 163, 165]},
			{hex: '#44C7DD', rgb: [68, 199, 221]},
			{hex: '#40EC9E', rgb: [64, 236, 158]},
			{hex: '#F9D821', rgb: [249, 216, 33]},
		]
	},
	{
		name: 'DaveJ_3',
		colors: [
			{hex: '#FF5286', rgb: [255, 82, 134]},
			{hex: '#F99340', rgb: [249, 147, 64]},
			{hex: '#F9D821', rgb: [249, 216, 33]},
			{hex: '#FED674', rgb: [254, 214, 116]},
			{hex: '#ED2972', rgb: [237, 41, 114]},
		]
	},
	{
		name: 'DaveJ_4',
		colors: [
			{hex: '#27A3A5', rgb: [39, 163, 165]},
			{hex: '#3165A0', rgb: [49, 101, 160]},
			{hex: '#8800F1', rgb: [136, 0, 241]},
			{hex: '#40EC9E', rgb: [64, 236, 158]},
			{hex: '#44C7DD', rgb: [68, 199, 221]},
		]
	},
]);

export function getRandomPalette() {
	return palettes.get( NumberUtils.randRound(palettes.size) );
}

export function getPalettes() {
	return palettes;
}

export function fetchOnlinePalettes() {
	console.log('this will be made soonish');
}