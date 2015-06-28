import PIXI from 'pixi.js/bin/pixi';
import Dimensions from '../constants/Dimensions';
import * as DrawBounds from './DrawBounds';

export function fadeFrames(pixiContainer, rate) {
	for(let index in pixiContainer.children) {
		pixiContainer.children[index].alpha -= rate;
		if(pixiContainer.children[index].alpha <= 0) pixiContainer.removeChildAt(index);
	}
	return pixiContainer;
}

export function clearStage(pixiContainer) {
	for (let index in pixiContainer.children ) {
		pixiContainer.removeChildAt(index)
	}
	return pixiContainer;
}

export function newSizedFrame() {
	let frame = new PIXI.Graphics();
	const bounds = DrawBounds.getBounds();
	frame.scale.x = frame.scale.y = bounds.scalePercent;
	frame.x = bounds.startX;
	frame.y = bounds.startY;
	return frame;
}