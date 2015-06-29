import * as EffectUtil from '../utils/EffectUtil';
import * as PixelUtil from '../utils/PixelUtil';
import * as PaletteStore from '../stores/Palettes.js';

export default class Circles1 {

	paramDefaults() {
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

	getEffectRequirements() {
		return {
			outline: false,
			audio: true,
			kinect: true,
		};
	}

	didMount() {
		
	}

	didUnmount() {

	}

	render() {

		this.stage = EffectUtil.fadeFrames(this.stage, 0.05);
		this.frame = EffectUtil.newSizedGraphic();

		for(let i = 0; i < 5; i ++) {

			const randomPoint1 = PixelUtil.getRandomPointInFocus();
			const randomPoint2 = PixelUtil.getRandomPointInFocusNearby(randomPoint1, 50);

			if(randomPoint1 && randomPoint2) {

				this.frame.lineStyle(1, PaletteStore.getRandomColor(), 1);
				this.frame.moveTo(randomPoint1.x, randomPoint1.y);
				this.frame.lineTo(randomPoint2.x, randomPoint2.y);

			}else{

				console.log('skipping draw -- 1 or more skipped randomPoint');

			}

		}

		this.stage.addChild(this.frame);
	}
}
