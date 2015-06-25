// Libs
import $ from 'jquery';
import Immutable from 'immutable';
// Core
import Dispatcher from './core/Dispatcher';
import KinectStream from './core/KinectStream';
import AudioStream from './core/AudioStream';
import Renderer from './core/Renderer';
//Utils
import SocketUtil from './utils/SocketUtil';
// Stores
import * as PaletteStore from './stores/Palette.js';
import * as EffectStore from './stores/Effects';

console.log('████████ STARTING APP █████████');


// Init kinect image stream

let imageStreamURL = 'http://localhost:3000/images';
let kinectStream = new KinectStream(imageStreamURL);
kinectStream.start();

let currentImage = kinectStream.getImage(); // may be null but doesn't matter


// Init audio stream

let audioStream = new AudioStream();


// Animation controls

let animating = false;
function processFrame() {

	let newImage = kinectStream.getImage();
	// Only update currentImage if it is in fact a new image
	if (currentImage !== newImage) {
		currentImage = newImage;
		document.getElementById('testImage').src = currentImage.src;
	}

	if(effectRequirements.audio) {
		// console.log(audioStream.getVolume());
		audioStream.process();
	}
	// ~~~ process current effect code and send to renderer
	renderer.renderFrame();

	if(animating) requestAnimationFrame(() => processFrame());
}

function startRendering() {
	animating = true;
	processFrame();
}
function stopRendering() {
	animating = false;
}


// Init renderer

const rendererDomElement = document.getElementById('stage')
const renderer = new Renderer(rendererDomElement, window.innerWidth, window.innerHeight);
renderer.init();


// Get effects list

let currentEffect = null;
let effectRequirements = null;

function loadEffect(effectName) {

	currentEffect = EffectStore.getEffect('Circles1');
	console.log('curent effect', currentEffect);
	console.log(currentEffect.effectRequirements);

	// effectRequirements = effectController.loadEffect(effectName);

	// if(effectRequirements.kinect) {
	// 	kinectStream.start();
	// }else {
	// 	kinectStream.stop();
	// }

	// if(effectRequirements.audio) {
	// 	audioStream.start();
	// }else {
	// 	audioStream.stop();
	// }

}
loadEffect('Circles1');


// Emit Socket.IO greeting

let socketUtil = new SocketUtil();
let effectList = EffectStore.getEffectList();

socketUtil.send('deviceActive', null);
socketUtil.listenAndReturn('effectList', {effectList: effectList});
socketUtil.listen('effectParam', effectParamUpdated);

function effectParamUpdated(data) {
	console.log('Effect param update received', data);
	// ~~~ update stores
	effectController.updateEffectParam(data);
}

// Window listener

$(window).bind('resize', windowResized );

function windowResized() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}


// Palettes

let currentPalette = PaletteStore.getRandomPalette();
console.log(PaletteStore.getRandomPalette());
console.log(PaletteStore.getRandomPalette());




// GOOOOOOOOOO

function startEverything() {
	windowResized();
	startRendering();
}

startEverything();