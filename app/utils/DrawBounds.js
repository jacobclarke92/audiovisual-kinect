
const KINECT_WIDTH = 320;
const KINECT_HEIGHT = 240;
const IMAGE_RATIO = KINECT_WIDTH/KINECT_HEIGHT;

export default class DrawBounds {

	constructor(width, height) {
		this.bounds = {};
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
		this.startX = 0;
		this.startY = 0;
		this.endX = width;
		this.endY = height;
	}

	process() {

		if(this.width/this.height > IMAGE_RATIO) {
			
			this.startY = 0;
			this.endY = this.height;

			let offsetSize = KINECT_WIDTH/(KINECT_HEIGHT/this.height);
			this.sizeRatio = this.height/KINECT_HEIGHT;

			this.startX = (this.width - offsetSize)/2;
			this.endX = this.width - (this.width - offsetSize)/2;

		}else{

			this.startX = 0;
			this.endX = this.width;

			let offsetSize = KINECT_HEIGHT/(KINECT_WIDTH/this.width);
			this.sizeRatio = this.width/KINECT_WIDTH;

			this.startY = (this.height - offsetSize)/2;
			this.endY = this.height - (this.height - offsetSize)/2;

		}
	}

}