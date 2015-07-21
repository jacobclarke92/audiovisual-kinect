import { VIEWPORT_RESIZE } from '../actions/ActionTypes';

const initialState = {
	width: 640,
	height: 480
};

export function viewport(state = initialState, action = {}) {
	switch (action.type) {
		case VIEWPORT_RESIZE:
			const { width, height } = action;
			return { ...state, width, height };
		default:
			return state;
	}
}