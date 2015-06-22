import $ from 'jquery';
import Effects from './effects/index';
import Renderer from './core/Renderer';
import KinectStream from './core/KinectStream';

console.log('████████ STARTING APP █████████');


// Init kinect image stream

let imageStreamURL = '/images';
let kinectStream = new KinectStream();
kinectStream.startStream(imageStreamURL);


// Init renderer

let renderer = new Renderer();
renderer.init();
renderer.drawBounds();

console.log(renderer.getWindowSize());


// Get effects list

let effectsList = [];
for(let effect in Effects) {
	effectsList.push(effect);
}
console.log(effectsList)

let Circles1 = new Effects[effectsList[0]]();
Circles1.params = {cool: 'guy'};
Circles1.render();


// setTimeout(() => kinectStream.stopStream(), 1500);