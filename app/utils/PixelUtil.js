import Dimensions from '../constants/Dimensions';

let bufferCanvas = document.createElement('canvas');
bufferCanvas.width = Dimensions.KINECT_WIDTH;
bufferCanvas.height = Dimensions.KINECT_HEIGHT;
let bufferCanvasContext = bufferCanvas.getContext('2d');

let pixels = [];

export function updatePixels(imageInstance) {
	bufferCanvasContext.drawImage(imageInstance, 0, 0);
	pixels = bufferCanvasContext.getImageData(0,0, Dimensions.KINECT_WIDTH, Dimensions.KINECT_HEIGHT).data;
}

export function getPixelValue(pixelX, pixelY) {
	return pixels[pixelX*pixelY*4 + 2];
}
