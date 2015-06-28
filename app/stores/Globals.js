import Immutable from 'immutable';

let globalVars = Immutable.Map(Immutable.fromJS({
	minDepth: 170,
	maxDepth: 255,
}));

export function get(varName) {
	return globalVars.get(varName);
}

export function set(varName, value) {
	globalVars = globalVars.set(varName, value);
}
