import Point from 'point-geometry';

import Dimensions from '../constants/Dimensions';
import * as Globals from '../stores/Globals';
import * as NumberUtils from '../utils/NumberUtils';

const bufferCanvas = document.createElement('canvas');
bufferCanvas.width = Dimensions.KINECT_WIDTH;
bufferCanvas.height = Dimensions.KINECT_HEIGHT;
const bufferCanvasContext = bufferCanvas.getContext('2d');

let pixels = [];
const attemptsBeforePanic = 25;

// Called externally upon image update
export function updatePixels(imageInstance) {
	bufferCanvasContext.drawImage(imageInstance, 0, 0);
	pixels = bufferCanvasContext.getImageData(0,0, Dimensions.KINECT_WIDTH, Dimensions.KINECT_HEIGHT).data;
}

// Get pixel value from XY position
export function getPixelValueFromPoint(point) {
	return pixels[ (point.x + point.y*Dimensions.KINECT_WIDTH)*4 + 2 ];
}

// Is pixel value within current allowed range?
export function isPixelInFocus(pixelValue) {
	return (pixelValue >= Globals.get('minDepth') && pixelValue <= Globals.get('maxDepth'));
}

// Find a random pixel currently in range
export function getRandomPointInFocus() {

	if(pixels.length === 0) return false;

	let randomPoint = NumberUtils.randPoint();
	let pixelValue = getPixelValueFromPoint(randomPoint);
	let panic = attemptsBeforePanic;

	while(!isPixelInFocus(pixelValue) && --panic > 0) {
		randomPoint = NumberUtils.randPoint();
		pixelValue = getPixelValueFromPoint(randomPoint);
	}
	if(panic <= 0) return false;
	return randomPoint;
}

// Find an in-focus point near an existing point
export function getRandomPointInFocusNearby(point, radius) {

	if(!point) return false;

	let randomPoint = NumberUtils.constrainPoint( point.add( NumberUtils.randomPointInCircle(radius) ) );
	let pixelValue = getPixelValueFromPoint(randomPoint);
	let panic = attemptsBeforePanic;

	while(!isPixelInFocus(pixelValue) && --panic > 0) {
		randomPoint = NumberUtils.constrainPoint( point.add( NumberUtils.randomPointInCircle(radius) ) );
		pixelValue = getPixelValueFromPoint(randomPoint);
	}

	if(panic <= 0) return false;
	return randomPoint;

}