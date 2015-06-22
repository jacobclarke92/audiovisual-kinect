import PIXI from 'pixi.js/bin/pixi';
import WindowListener from '../core/WindowListener';
let windowListener = new WindowListener();

export default class Renderer {

	constructor() {
		this.stage = false;
		this.renderer = false;
	}


	changeScript(scriptName) {

	}

	init() {

		let windowSize = windowListener.getWindowSize();
		console.log(windowSize);
		this.renderer = PIXI.autoDetectRenderer(windowSize.width, windowSize.height, {
			antialias: true,
			backgroundColor: 0x000000
		});
		this.renderer.view.id = 'renderer';
		document.getElementById('stage').appendChild(this.renderer.view);

		this.stage = new PIXI.Container();
		
	}



}