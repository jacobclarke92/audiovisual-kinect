import { Map } from 'immutable';
import { VIEWPORT_UPDATE } from '../actions/ActionTypes';

const initialState = Map({
	width: window.innerWidth,
	height: window.innerHeight
});

export function viewport(state = initialState, action = {}) {
	switch (action.type) {
		case VIEWPORT_UPDATE:
			console.log(action);
			return state;
		default:
			return state;
	}
}