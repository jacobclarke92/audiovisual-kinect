
import KinectStreamWorker from '../workers/KinectStream';


function createWorkerURL(func) {
	return URL.createObjectURL(new Blob(['(', func.toString(), ')()' ], {type: 'application/javascript'}));
}

export default class KinectStream {

	constructor(url) {
		this.url = url;
		this.image = null;
		this.worker = false;
	}

	start() {
		console.log('starting kinect stream');
		if(this.worker) this.stop();
		this.worker = new Worker(createWorkerURL(KinectStreamWorker));
		this.worker.addEventListener('message', this.onImageUpdate.bind(this));
		this.worker.postMessage({
			'cmd': 'start',
			'path': this.url
		});
	}

	stop() {
		console.log('stopping kinect stream');
		if(!this.worker) return;
		this.worker.postMessage({'cmd': 'stop'});
		this.worker.terminate();
		this.worker = false;
	}

	getImage() {
		return this.image;
	}

	onImageUpdate(event) {
		this.image = new Image();
		this.image.src = event.data.image;
	}


}
