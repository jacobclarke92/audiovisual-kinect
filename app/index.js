import Effects from './effects/index';
import Renderer from './core/Renderer';
import KinectStream from './core/KinectStream';
import WindowListener from './core/WindowListener';

console.log(Effects);

const circle = new Effects.Circles1();
circle.params = {adam: 'sucks'};
circle.render();

let imageStreamURL = '/images';
let kinectStream = new KinectStream();
kinectStream.startStream(imageStreamURL);

let windowListener = new WindowListener().init();


let renderer = new Renderer();
renderer.init();



// setTimeout(() => kinectStream.stopStream(), 1500);

