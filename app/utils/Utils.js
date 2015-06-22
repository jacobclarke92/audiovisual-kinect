export default class Utils {

	static rand(start, end) {
		if(end) {
			let actualRange = Math.abs(end - start);
	        return start + Math.random()*actualRange;
		}else{
			
		}
	}

	static randRound(start, end) {
		let actualRange = Math.abs(end - start);
	    return start + Math.floor(Math.random()*actualRange);
	}

	static mapRange(value, start1, stop1, start2, stop2) {
		return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
	}

}