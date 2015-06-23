export function rand(start = 0, end = 1) {
	if (end) {
		const actualRange = Math.abs(end - start);
        return start + Math.random() * actualRange;
	} else {
		
	}
}

export function randRound(start, end) {
	const actualRange = Math.abs(end - start);
    return start + Math.floor(Math.random()*actualRange);
}

export function mapRange(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}