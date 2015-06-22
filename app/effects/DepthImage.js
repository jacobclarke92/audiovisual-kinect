

export default class DepthImage {

	static paramDefaults() {
		return {
			
		};
	}

	static getEffectRequirements() {
		return {
			outline: false,
			audio: false,
			kinect: true
		};
	}

	onLoad() {

	}

	onUnload() {

	}

	init() {

	}

	render() {
		
		console.log('draw!');
		if(this.currentKinectImage) {

		}

	}
}
