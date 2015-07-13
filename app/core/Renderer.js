import $ from 'jquery';
import PIXI from 'pixi.js/bin/pixi';
import AppDispatcher from '../AppDispatcher';
import SocketUtil from '../utils/SocketUtil';
import EffectStore from '../stores/Effects';
import ParamStore from '../stores/Params';

let socketUtil = new SocketUtil();
let currentEffectName = null;
let currentEffect = null;

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
		this.renderer.resize(width, height);

	}

	renderFrame() {

		currentEffect.params = ParamStore.getEffectParamValues(currentEffectName);
		currentEffect.render();
		this.renderer.render(currentEffect.stage);

	}

	changeEffect(effectName) {

		if(currentEffect) currentEffect.didUnmount();

  		currentEffectName = effectName;
  		currentEffect = EffectStore.get(currentEffectName);
  		currentEffect.stage = new PIXI.Container();

  		currentEffect.didMount();


  		let currentEffectParams = currentEffect.getParamDefaults();
		for(let i in currentEffectParams) {
			currentEffectParams[i].family = 'Effect';
			currentEffectParams[i].effectName = currentEffectName;
		}
  		ParamStore.addEffectParams(currentEffectParams);

		socketUtil.send('effectParams', ParamStore.getEffectParams(currentEffectName));

	}

	getCurrentEffectRequirements() {
		return currentEffect.getEffectRequirements();
	}

	getCurrentEffectName() {
		return currentEffectName;
	}

	getCurrentEffectParams() {
		return ParamStore.getEffectParams(currentEffectName);
	}

}