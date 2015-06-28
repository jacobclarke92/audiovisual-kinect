import Immutable from 'immutable';
import HexRGB from 'hexrgb';
import * as NumberUtils from '../utils/NumberUtils';

let palettes = Immutable.List();
let currentPalette = null;

function addPalette(paletteName, hexList) {
	let colors = [];
	for(let hex of hexList) {
		let rgb = HexRGB.hex2rgb(hex);
		colors.push( {hex, rgb} );
	}
	palettes = palettes.push(Immutable.fromJS({
		name: paletteName,
		colors: colors
	}));
}

addPalette('DaveJ_1', ['#ED2972','#EC1A41','#D91D52','#511346','#8800F1']);
addPalette('DaveJ_2', ['#3165A0','#27A3A5','#44C7DD','#40EC9E','#F9D821']);
addPalette('DaveJ_3', ['#FF5286','#F99340','#F9D821','#FED674','#ED2972']);
addPalette('DaveJ_4', ['#27A3A5','#3165A0','#8800F1','#40EC9E','#44C7DD']);
// console.log(palettes.toJS());

export function getPalettes() {
	return palettes;
}

export function getCurrentPalette() {
	return currentPalette;
}

export function getRandomPalette() {
	return palettes.get( NumberUtils.randRound(palettes.size) );
}

export function fetchOnlinePalettes() {
	console.log('this will be made soonish');
}

export function setCurrentPaletteByName(paletteName) {
	currentPalette = palettes.get(paletteName);
}

export function setCurrentPaletteToRandom() {
	currentPalette = palettes.get( NumberUtils.randRound(palettes.size) );
}

export function getRandomColor() {
	if(!currentPalette) setCurrentPaletteToRandom();
	return currentPalette.getIn( ['colors', NumberUtils.randRound(4), 'hex' ] );
}