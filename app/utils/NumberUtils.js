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

export function mapRange(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}