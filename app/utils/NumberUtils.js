import Point from 'point-geometry';
import Dimensions from '../constants/Dimensions';

export function rand(range) {
	let start = 0, end = range;
	if (typeof range == 'array') {
		start = range[0];
		end = range[1];
	}
	const actualRange = Math.abs(end - start);
    return start + Math.random() * actualRange;
}

export function randRound(range) {
	let start = 0, end = range;
	if (typeof range == 'array') {
		start = range[0];
		end = range[1];
	}
	const actualRange = Math.abs(end - start);
    return start + Math.floor(Math.random()*actualRange);
}

export function randPoint() {
	return new Point( randRound( Dimensions.KINECT_WIDTH ), randRound( Dimensions.KINECT_HEIGHT ) );
}

export function mapRange(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export function bound(number, min, max) {
	return Math.max(Math.min(number, max), min);
}

export function boundRound(number, min, max) {
	return Math.max(Math.min(Math.floor(number), max), min);
}

export function constrainPoint(point) {
	point.x = boundRound(point.x, 0, Dimensions.KINECT_WIDTH );
	point.y = boundRound(point.y, 0, Dimensions.KINECT_HEIGHT );
	return point;
}

export function randomPointInCircle(radius) {
	const r = Math.random()*radius;
	const a = Math.random()*Math.PI*2;
	return new Point( Math.cos(a)*r, Math.sin(a)*r );
}
	