import $ from 'jquery';
import Effects from './effects/index';
import Renderer from './core/Renderer';
import KinectStream from './core/KinectStream';

console.log(Effects);

let imageStreamURL = '/images';
let kinectStream = new KinectStream();
kinectStream.startStream(imageStreamURL);

let renderer = new Renderer();
renderer.init();
renderer.drawBounds();

console.log(renderer.getWindowSize())


// setTimeout(() => kinectStream.stopStream(), 1500);

