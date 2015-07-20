import Immutable from 'immutable';

const initialState = Immutable.Map({
	params: [
		{type: 'range', name: 'minRange', label: 'Minimum Depth', value: 50, min: 0, max: 110, step: 1},
		{type: 'range', name: 'maxRange', label: 'Maximum Depth', value: 50, min: 0, max: 120, step: 1},
		{type: 'boolean', name: 'mirrored', label: 'Mirrored', value: 0}, // checkbox 
		{type: 'range', name: 'zoom', label: 'Zoom', value: 1, min: 0.2, max: 4, step: 0.05},
	],
});

export function calibrationParams(state = initialState, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}