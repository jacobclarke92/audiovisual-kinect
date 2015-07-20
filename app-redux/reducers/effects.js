import Immutable from 'immutable';
import { EFFECT_ADD } from '../actions/ActionTypes'

const initialState = Immutable.Map({
	effects: [{
			name: 'Rain',
			label: 'Rain',
		},
		{
			name: 'Sparks',
			label: 'Sparks',
		},
	],
	currentEffect: 'Rain',
});

export function effects(state = initialState, action = {}) {
	switch (action.type) {
		case EFFECT_ADD:
			return state;
		default:
			return state;
	}
}