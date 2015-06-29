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

export function newSizedGraphic() {
	let graphic = new PIXI.Graphics();
	const bounds = DrawBounds.getBounds();
	graphic.scale.x = graphic.scale.y = bounds.scalePercent;
	graphic.x = bounds.startX;
	graphic.y = bounds.startY;
	return graphic;
}

export function newSizedContainer() {
	let container = new PIXI.DisplayObjectContainer();
	const bounds = DrawBounds.getBounds();
	container.scale.x = container.scale.y = bounds.scalePercent;
	container.x = bounds.startX;
	container.y = bounds.startY;
	return container;
}

export function sizePixiObject(object) {
	const bounds = DrawBounds.getBounds();
	object.scale.x = object.scale.y = bounds.scalePercent;
	object.x = bounds.startX;
	object.y = bounds.startY;
	return object;
}