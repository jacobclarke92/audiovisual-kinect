import PIXI from 'pixi.js/bin/pixi';
import * as EffectUtil from '../utils/EffectUtil';
import * as PixelUtil from '../utils/PixelUtil';
import * as NumberUtils from '../utils/NumberUtils';

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
		// this.frame = new PIXI.Graphics();
		// this.stage.addChild(this.frame)
	}

	didUnmount() {

	}

	render() {

		this.stage = EffectUtil.fadeFrames(this.stage, 0.1);
		this.frame = new PIXI.Graphics();

		this.frame.lineStyle(2, 0xFFFFFF, 1);
		this.frame.moveTo(NumberUtils.randRound(640), NumberUtils.randRound(480));
		this.frame.lineTo(NumberUtils.randRound(640), NumberUtils.randRound(480));

		this.stage.addChild(this.frame);

		// console.log(PixelUtil.getPixelValue(160, 120));

	}

}
