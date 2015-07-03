import * as EffectUtil from '../utils/EffectUtil';
import * as PixelUtil from '../utils/PixelUtil';
import * as NumberUtils from '../utils/NumberUtils';
import * as PaletteStore from '../stores/Palettes.js';

export default class Circles1 {

	getParamDefaults() {
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

				const midPoint = NumberUtils.getMidPoint(randomPoint1, randomPoint2);
				const radius = randomPoint1.dist(randomPoint2)/2;

				this.frame.lineStyle(1, PaletteStore.getRandomColor(), 1);
				this.frame.drawCircle(midPoint.x, midPoint.y, radius);


			}else{

				console.log('skipping draw -- 1 or more skipped randomPoint');

			}
		}

		this.stage.addChild(this.frame);
	}
}
