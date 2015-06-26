

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