//import Effect from './Effect';
//import PaletteStore from '../stores/PaletteStore';
//import '/app/core/EffectParams';

export default class Circles1 {

	static paramDefaults() {
		return {
			lineThickness: {
				label: 'Line Thickness (px)',
				min: 1,
				max: 50,
				value: 2
			},
			anotherParam: {
				min: 1,
				max: 100,
				value: 50
			}
		};
	}

	static getEffectRequirements() {
		return {
			outline: true,
			audio: true
		};
	}

	onLoad() {

	}

	onUnload() {

	}

	init() {

	}

	render() {
		// this.graphics.addChild();
		console.log('draw!');
		console.log(this.params);
		// console.log(this.params.lineThickness);
		/*
		const { lineThickness, anotherParam } = this.params;
		//this.palette
		//this.audio.volume;

		
		var colour = PaletteStore.getRandomColour();
		var colourChanged = colour.set('name', 'Something else');*/
	}
}
