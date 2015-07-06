// Libs
import $ from 'jquery';
import Immutable from 'immutable';
import PIXI from 'pixi.js/bin/pixi';
// Core
import * as AppActions from './actions/AppActions';
import KinectStream from './core/KinectStream';
import AudioStream from './core/AudioStream';
import Renderer from './core/Renderer';
import SocketListener from './core/SocketListener';
//Utils
import SocketUtil from './utils/SocketUtil';
import * as DrawBounds from './utils/DrawBounds';
import * as PixelUtil from './utils/PixelUtil';
// Stores
import * as EffectStore from './stores/Effects';
import ParamStore from './stores/Params';

console.log('████████ STARTING APP █████████');

// Emit Socket.IO greeting

let socketUtil = new SocketUtil();
socketUtil.send('deviceActive', null);

let effectList = EffectStore.getEffectList();
socketUtil.listenAndReturn('effectList', {effectList});
socketUtil.send('effectList', {effectList});

socketUtil.listen('paramUpdated', function(data) {
	if(data.deviceName === 'Core') return;
	console.log(data.data);
	AppActions.updateParam(data);
});


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
		PixelUtil.updatePixels(currentImage);
		document.getElementById('testImage').src = currentImage.src;
	}

	if(currentEffectRequirements && currentEffectRequirements.audio) {
		// console.log(audioStream.getVolume());
		audioStream.process();
	}
	
	// Process current effect code and send to renderer
	EffectStore.renderCurrentEffect();
	renderer.renderFrame(EffectStore.getCurrentEffectStage());

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

let currentEffectRequirements = null;

function loadEffect(effectName) {

	AppActions.changeEffect({effectName});
	
	currentEffectRequirements = EffectStore.getCurrentEffectRequirements();

	if(currentEffectRequirements.kinect) kinectStream.start();
	else kinectStream.stop();

	if(currentEffectRequirements.audio) audioStream.start();
	else audioStream.stop();

	socketUtil.send('effectParams', EffectStore.getCurrentEffectParams());

}

// Window listener

$(window).bind('resize', windowResized );

function windowResized() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	DrawBounds.setWindowSize(window.innerWidth, window.innerHeight);
}




// GOOOOOOOOOO

function startEverything() {
	windowResized();
	loadEffect('Rain');
	startRendering();
}

startEverything();