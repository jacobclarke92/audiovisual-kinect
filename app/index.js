import $ from 'jquery';
import _ from 'lodash';
import SocketIO from 'socket.io-client';
import Effects from './effects/index';
import KinectStream from './core/KinectStream';
import Renderer from './core/Renderer';

console.log('████████ STARTING APP █████████');


// Init kinect image stream

let imageStreamURL = 'http://localhost:3000/images';
let kinectStream = new KinectStream(imageStreamURL);
kinectStream.start();

let currentImage = kinectStream.getImage(); // may be null but doesn't matter

// Init renderer

const rendererDomElement = document.getElementById('stage')
const renderer = new Renderer(rendererDomElement, window.innerWidth, window.innerHeight);
renderer.init();


// Get effects list

const effectsList = _.keys(Effects);
console.log(effectsList)

let Circles1 = new Effects[effectsList[0]]();
Circles1.params = {cool: 'guy'};
Circles1.render();


// Emit Socket.IO greeting

var socket = SocketIO.connect('http://localhost:3000/');
socket.emit('deviceActive', {
	request: 'SET',
	deviceName: 'Core'
});

// socket.on('news', function(data) {
// 	console.log(data);
// 	socket.emit('my other event', {my: 'data'});
// });


// setTimeout(() => kinectStream.stopStream(), 1500);
// setTimeout(() => renderer.stopRendering(), 1500);

$(window).bind('resize', windowResized );
// window.addEventListener('resize', () => windowResized);

function windowResized() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}
console.log(renderer);
function processFrame() {
	let newImage = kinectStream.getImage();
	if (currentImage !== newImage) {
		currentImage = newImage;
		document.getElementById('testImage').src = currentImage.src;
	}else{

	}

	renderer.renderFrame();

	// Request next frame
	requestAnimationFrame(() => processFrame());
}


function startEverything() {
	windowResized();
	processFrame();	
}


startEverything();