// Libs
import $ from 'jquery';
import Immutable from 'immutable';
// Core
import AppDispatcher from './AppDispatcher';
import KinectStream from './core/KinectStream';
import AudioStream from './core/AudioStream';
import Renderer from './core/Renderer';
import SocketListener from './core/SocketListener';
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

	if(currentEffectRequirements&& currentEffectRequirements.audio) {
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
let currentEffectRequirements = null;

function loadEffect(effectName) {

	currentEffect = EffectStore.getEffect(effectName);
	currentEffectRequirements = currentEffect.getEffectRequirements();

	if(currentEffectRequirements.kinect) {
		kinectStream.start();
	}else {
		kinectStream.stop();
	}

	if(currentEffectRequirements.audio) {
		audioStream.start();
	}else {
		audioStream.stop();
	}

}
let currentEffectName = 'Circles1';
loadEffect(currentEffectName);

console.log(EffectStore.getEffectParam(currentEffectName, 'lineThickness').toJS());
console.log(EffectStore.getEffectParamValue(currentEffectName, 'lineThickness'));

// Emit Socket.IO greeting

let socketUtil = new SocketUtil();
socketUtil.send('deviceActive', null);

let effectList = EffectStore.getEffectList();
socketUtil.listenAndReturn('effectList', {effectList: effectList});

// Window listener

$(window).bind('resize', windowResized );

function windowResized() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}


// Palettes

let currentPalette = PaletteStore.getRandomPalette();
console.log(PaletteStore.getRandomPalette().toJS());
console.log(PaletteStore.getRandomPalette().toJS());




// GOOOOOOOOOO

function startEverything() {
	windowResized();
	startRendering();
}

startEverything();