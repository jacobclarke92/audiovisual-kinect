import PIXI from 'pixi.js/bin/pixi';
import * as Dimensions from '../constants/Dimensions';
import * as PixelUtil from '../utils/PixelUtil';
import * as EffectUtil from '../utils/EffectUtil';
import * as NumberUtils from '../utils/NumberUtils';
import * as PaletteStore from '../stores/Palettes.js';

export default class Circles1 {

	getParamDefaults() {
		return [
			{
				name: 'lineThickness',
				label: 'Line Thickness (px)',
				value: 2,
				min: 0.1,
				max: 50,
				step: 0.5,
			},
			{
				name: 'gravity',
				label: 'Gravity',
				value: 5,
				min: 1,
				max: 10,
				step: 0.2,
			},
			{
				name: 'wind',
				label: 'Wind',
				value: 0,
				min: -10,
				max: 10,
				step: 0.5,
			},
			{
				name: 'windVariation',
				label: 'Wind Variation',
				value: 0.5,
				min: 0,
				max: 5,
				step: 0.1,
			},
			{
				name: 'lineLength',
				label: 'Line Length',
				value: 20,
				min: 5,
				max: 100,
				step: 1,
			}
		];
	}

	getEffectRequirements() {
		return {
			outline: false,
			audio: false,
			kinect: true,
		};
	}

	didMount() {
		this.droplets = [];
		this.container = EffectUtil.newSizedContainer();
		this.stage.addChild(this.container);
	}

	didUnmount() {

	}

	render() {

		for(let i = 0; i < 5; i ++) {

			let droplet = new Droplet();
			droplet.params = this.params;
			droplet.init();
			this.container.addChild(droplet.shape);
			this.droplets.push(droplet);
		}

		for(let i=0; i<this.droplets.length; i ++) {
			this.droplets[i].params = this.params;
			this.droplets[i].draw();
			if(this.droplets[i].dead) {
				this.container.removeChild(this.droplets[i].shape);
				this.droplets.splice(i, 1);
			}
		};
	}
}

class Droplet {

	init() {

		this.windOffset = NumberUtils.rand([-this.params.windVariation, this.params.windVariation]);
		this.moveX = NumberUtils.randRound(Dimensions.KINECT_WIDTH + this.windOffset*2) - this.windOffset*2;
		this.lastX = this.moveX;
		this.moveY = this.lastY = 0;
		this.life = 0;
		this.dead = false;
		this.splash = false;
		this.gravity = this.params.gravity + NumberUtils.rand([0.8, 1.2]);

		this.shape = new PIXI.Graphics();
		this.shape.lineStyle(this.params.lineThickness, PaletteStore.getRandomColor(), 1);
		this.shape.moveTo(0,0);
		this.shape.lineTo(0, -this.params.lineLength);

	}

	changeToSplash() {

		this.shape.clear();
		this.shape.lineStyle(this.params.lineThickness, PaletteStore.getRandomColor(), 1);
		this.shape.moveTo(0,0);
		this.shape.lineTo(0, -10);
		this.shape.moveTo(0,0);
		this.shape.lineTo(-8, -5);
		this.shape.moveTo(0,0);
		this.shape.lineTo(8, -5);

		this.shape.scale.x = 0.5;
		this.shape.scale.y = 1;

		this.life = 0;
		this.splash = true;
	}

	draw() {

		this.life ++;

		if(this.splash) {

			this.shape.scale.x += 0.5;
			this.shape.scale.y -= 0.1;
			this.shape.alpha -= 0.2;
			
			if(this.life > 8) {
				this.dead = true;
			}

		}else{

			this.moveX += this.params.wind + this.windOffset;
			this.moveY += this.gravity;

			this.shape.rotation = Math.atan2( this.moveY - this.lastY, this.moveX - this.lastX ) - Math.PI/2;

			if(this.moveY > Dimensions.KINECT_HEIGHT) this.moveY = Dimensions.KINECT_HEIGHT;

			//position based on stage size
			this.shape.x = this.moveX;//tX( this.moveX );
			this.shape.y = this.moveY;//tY( this.moveY );


			if(this.moveX < -this.windOffset*2 || this.moveX > Dimensions.KINECT_WIDTH + this.windOffset*2) {
				this.dead = true;
			}else if(this.moveY >= Dimensions.KINECT_HEIGHT) {
				this.changeToSplash();
			}else if(PixelUtil.isPixelInFocus(PixelUtil.getPixelValueFromPoint(this.shape))) {
				this.changeToSplash();
			}

			this.lastX = this.moveX;
			this.lastY = this.moveY;

		}

	}

}