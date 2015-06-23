
let imageEventSource = false;
let kinectStreamWorker = false;
let currentKinectImage = new Image();
let kinectStreamWorkerURL = '/app/workers/KinectStream.js';

export default class KinectStream {

	constructor() {
		this.currentKinectImage = currentKinectImage;
	}

	startStream(imageStreamURL) {

		console.log('starting kinect stream');
		this.startWorker(imageStreamURL);
	}

	stopStream() {

		console.log('stopping kinect stream');
		this.stopWorker();
	}

	startWorker(imageStreamURL) {
		if(kinectStreamWorker) this.stopWorker();
		kinectStreamWorker = new Worker(kinectStreamWorkerURL);
		kinectStreamWorker.addEventListener('message', this.onImageUpdate);
		kinectStreamWorker.postMessage({
			'cmd': 'start',
			'path': imageStreamURL
		});
	}

	stopWorker() {
		if(!kinectStreamWorker) return;
		kinectStreamWorker.postMessage({'cmd': 'stop'});
		kinectStreamWorker.terminate();
		kinectStreamWorker = false;
	}

	onImageUpdate(event) {
		// console.log('onImageUpdate');
		document.getElementById('testImage').src = event.data.image;

	}

	test() {
		console.log('hello world');
	}


}