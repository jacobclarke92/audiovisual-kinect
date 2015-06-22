import $ from 'jquery';
import PIXI from 'pixi.js/bin/pixi';

let windowWidth = 0;
let windowHeight = 0;

let baseWidth = 640;
let baseHeight = 480;

let imageRatio = baseWidth/baseHeight;

let startDrawX, startDrawY, endDrawX, endDrawY = 0;

export default class Renderer {

	constructor() {
		this.stage = false;
		this.renderer = false;
	}


	changeScript(scriptName) {

	}

	init() {

		console.log('initing');
		this.updateWindowSize();

		this.renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight, {
			antialias: true,
			backgroundColor: 0x000000
		});
		this.renderer.view.id = 'renderer';
		document.getElementById('stage').appendChild(this.renderer.view);

		this.stage = new PIXI.Container();


		let _this = this;
		$(window).unbind('resize').bind('resize', () => _this.windowResized() );


	}

	updateWindowSize() {

		// console.log('updating window size');
		windowWidth = $(window).width();
		windowHeight = $(window).height();

		if(windowWidth/windowHeight > imageRatio) {
			
			startDrawY = 0;
			endDrawY = windowHeight;

			let offsetSize = baseWidth/(baseHeight/windowHeight);

			startDrawX = (windowWidth - offsetSize)/2;
			endDrawX = windowWidth - (windowWidth - offsetSize)/2;

		}else{

			startDrawX = 0;
			endDrawX = windowWidth;

			let offsetSize = baseHeight/(baseWidth/windowWidth);

			startDrawY = (windowHeight - offsetSize)/2;
			endDrawY = windowHeight - (windowHeight - offsetSize)/2;

		}
	}
	
	windowResized() {	
		
		// console.log('window resized');
		this.updateWindowSize();
		this.renderer.resize(windowWidth, windowHeight);
		this.drawBounds();
	}


	getWindowSize() {
		return {
			width: windowWidth,
			height: windowHeight
		}
	}

	drawBounds() {

		this.clearStage();

		let graphics = new PIXI.Graphics();
		graphics.lineStyle(4, 0xFFFFFF, 1);

		// X
		graphics.moveTo(0,0)
		graphics.lineTo(windowWidth, windowHeight);
		graphics.moveTo(windowWidth, 0);
		graphics.lineTo(0, windowHeight);

		// Bounds
		graphics.moveTo(startDrawX, startDrawY);
		graphics.lineTo(endDrawX, startDrawY);
		graphics.lineTo(endDrawX, endDrawY);
		graphics.lineTo(startDrawX, endDrawY);
		graphics.lineTo(startDrawX, startDrawY);

		this.stage.addChild(graphics);
		this.renderer.render(this.stage);

	}

	clearStage() {
		for (let index in this.stage.children ) {
			this.stage.removeChild(this.stage.children[index])
		}
	}



}