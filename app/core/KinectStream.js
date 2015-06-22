
let imageEventSource = false;
let closingImageEventSource = false;
let currentKinectImage = new Image();

export default class KinectStream {

	constructor() {
		this.currentKinectImage = currentKinectImage;
	}

	startStream(imageStreamURL) {

		console.log('starting kinect stream');
		closingImageEventSource = false;

		imageEventSource = new EventSource(imageStreamURL);
		imageEventSource.addEventListener('message', function(event) {

			if(closingImageEventSource) {
				event.target.close();

			}else if(event.data.substring(0,14) == 'data:image/png' ) {
				// console.log('got image');
				currentKinectImage.src = event.data;
			}
		});
		currentKinectImage.onload = this.onImageUpdate;
	}

	stopStream() {
		console.log('stopping kinect stream');
		closingImageEventSource = true;
	}

	onImageUpdate(event) {
		// console.log('onImageUpdate');
		document.getElementById('testImage').src = currentKinectImage.src;

	}

	test() {
		console.log('hello world');
	}


}