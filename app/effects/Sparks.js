import PIXI from 'pixi.js/bin/pixi';
import Point from 'point-geometry';
import * as Dimensions from '../constants/Dimensions';
import * as PixelUtil from '../utils/PixelUtil';
import * as EffectUtil from '../utils/EffectUtil';
import * as NumberUtils from '../utils/NumberUtils';
import * as PaletteStore from '../stores/Palettes';


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
			}
		];
	}

	getEffectRequirements() {
		return {
			outline: false,
			audio: false,
			kinect: true,
			palette: true
		};
	}

	didMount() {
		this.particles = [];
		this.container = EffectUtil.newSizedContainer();
		this.stage.addChild(this.container);
	}

	didUnmount() {

	}

	render() {

		// this.params = {lineThickness: 0.5};

		for(let i = 0; i < NumberUtils.randRound([0,2]); i ++) {

			const particle = new Particle();
			particle.params = this.params;
			particle.init();
			this.container.addChild(particle.shape);
			this.particles.push(particle);
		}

		for(let i=0; i<this.particles.length; i ++) {
			this.particles[i].draw();
			if(this.particles[i].dead) {
				this.container.removeChild(this.particles[i].shape);
				this.particles.splice(i, 1);
			}
		};
	}
}

class Particle {

	init() {

		this.shape = new PIXI.Graphics();

		this.startPoint = NumberUtils.randPoint();
		this.endPoint = this.startPoint.add( NumberUtils.randomPointInCircle(120) );

		this.col = PaletteStore.getRandomColor();

		// const angle = this.startPoint.angleWith(this.endPoint); //this does some cool shit
		const angle = Math.atan2(this.endPoint.y-this.startPoint.y, this.endPoint.x-this.startPoint.x);//this.startPoint.angleTo(this.endPoint);
		const distance = this.startPoint.dist(this.endPoint);
		const speed = NumberUtils.rand([2, 7]);

		this.timeToDie = Math.ceil(distance/speed);
		this.life = this.timeToDie * 2;

		this.speedVector = new Point(Math.cos(angle)*speed, Math.sin(angle)*speed);
		this.lastPoint = this.startPoint;

		this.dead = false;
		this.state = false;

	}

	draw() {
		this.shape.clear();
		this.shape.lineStyle(this.params.lineThickness, PaletteStore.getRandomColor(), 1);
		// this.shape.lineStyle(this.lineThickness, this.col, 1);

		this.life --;
		if(this.life <= 0) this.dead = true;

		// Add some fuckery
		// this.startPoint.x += Math.random() - 0.5;
		// this.startPoint.y += Math.random() - 0.5;
		// this.endPoint.x += Math.random() - 0.5;
		// this.endPoint.y += Math.random() - 0.5;

		if(this.life > this.timeToDie) {
			this.shape.moveTo(this.startPoint.x, this.startPoint.y);
			this.lastPoint = this.lastPoint.add(this.speedVector);
			this.shape.lineTo(this.lastPoint.x, this.lastPoint.y);
			this.shape.drawCircle(this.endPoint.x, this.endPoint.y, this.life/2 - this.timeToDie);
		}else{
			// this.shape.lineStyle(1, 0xFF0000, 1);
			this.shape.moveTo(this.startPoint.x, this.startPoint.y);
			this.startPoint = this.startPoint.add(this.speedVector);
			this.shape.lineTo(this.endPoint.x, this.endPoint.y);
			this.shape.drawCircle(this.endPoint.x, this.endPoint.y, this.life/2);
		}
	}
}