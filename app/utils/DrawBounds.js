import * as Dimensions from '../constants/Dimensions';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let scalePercent = null,
	startX = 0,
	startY = 0,
	endX = Dimensions.KINECT_WIDTH,
	endY = Dimensions.KINECT_HEIGHT

export function getBounds() {
	return {
		scalePercent,
		startX,
		startY,
		endX,
		endY,
	}
}

export function setWindowSize(width, height) {
	windowWidth = width;
	windowHeight = height;
	process();
}

function process() {
	if(windowWidth/windowHeight > Dimensions.KINECT_RATIO) {
			
		startY = 0;
		endY = windowHeight;

		let offsetSize = Dimensions.KINECT_WIDTH/(Dimensions.KINECT_HEIGHT/windowHeight);
		scalePercent = windowHeight/Dimensions.KINECT_HEIGHT;

		startX = (windowWidth - offsetSize)/2;
		endX = windowWidth - (windowWidth - offsetSize)/2;

	}else{

		startX = 0;
		endX = windowWidth;

		let offsetSize = Dimensions.KINECT_HEIGHT/(Dimensions.KINECT_WIDTH/windowWidth);
		scalePercent = windowWidth/Dimensions.KINECT_WIDTH;

		startY = (windowHeight - offsetSize)/2;
		endY = windowHeight - (windowHeight - offsetSize)/2;

	}
}

process();