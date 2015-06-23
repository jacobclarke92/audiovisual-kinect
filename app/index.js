import $ from 'jquery';
import SocketIO from 'socket.io-client';
import KinectStream from './core/KinectStream';
import Renderer from './core/Renderer';
import EffectController from './core/EffectController';

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

let effectController = new EffectController();
effectController.loadEffect('Circles1');


// Emit Socket.IO greeting

var socket = SocketIO.connect('http://localhost:3000/');
socket.emit('deviceActive', {
	request: 'SET',
	deviceName: 'Core'
});

socket.on('effectList', function(data) {
	if(data.request == 'GET') {
		console.log('effect list requested');
		let list = effectController.getEffectList();
		socket.emit('effectList', {
			request: 'SET',
			effectList: list
		});
	};
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