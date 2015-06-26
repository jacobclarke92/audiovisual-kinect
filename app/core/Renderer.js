import $ from 'jquery';
import PIXI from 'pixi.js/bin/pixi';
import DrawBounds from '../utils/DrawBounds';

let drawBounds = new DrawBounds();

export default class Renderer {

	constructor(domContainer, width, height) {
		this.stage = false;
		this.renderer = false;
		this.width = width;
		this.height = height;
		this.domContainer = domContainer;
	}

	init() {

		console.log('initing');

		this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
			antialias: true,
			backgroundColor: 0x000000
		});
		this.renderer.view.className = 'pixi-canvas';
		this.domContainer.appendChild(this.renderer.view);
		
	}

	setSize(width, height) {

		this.width = width;
		this.height = height;
		drawBounds.setSize(width, height);
		drawBounds.process();
		this.renderer.resize(width, height);

	}

	renderFrame(pixiContainer) {
		this.renderer.render(pixiContainer);
	}

	drawBounds() {

		// Depth image
		let base = new PIXI.BaseTexture(document.getElementById('testImage'));
		let texture = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, 320, 240));
		let sprite = new PIXI.Sprite(texture);
		sprite.alpha = 1;
		sprite.x = drawBounds.startX;
		sprite.y = drawBounds.startY;
		sprite.scale.x = drawBounds.sizeRatio;
		sprite.scale.y = drawBounds.sizeRatio;
		this.stage.addChild(sprite);

		let graphics = new PIXI.Graphics();
		graphics.lineStyle(4, 0xFFFFFF, 1);

		// X
		graphics.moveTo(0,0)
		graphics.lineTo(drawBounds.width, drawBounds.height);
		graphics.moveTo(drawBounds.width, 0);
		graphics.lineTo(0, drawBounds.height);

		// Bounds
		graphics.moveTo(drawBounds.startX, drawBounds.startY);
		graphics.lineTo(drawBounds.endX, drawBounds.startY);
		graphics.lineTo(drawBounds.endX, drawBounds.endY);
		graphics.lineTo(drawBounds.startX, drawBounds.endY);
		graphics.lineTo(drawBounds.startX, drawBounds.startY);

		this.stage.addChild(graphics);

	}

}