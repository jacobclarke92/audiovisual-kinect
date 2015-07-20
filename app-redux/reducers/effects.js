import _ from 'lodash';
import Immutable from 'immutable';
import { EFFECT_ADD } from '../actions/ActionTypes'
import Effects from '../effects/index';

const initialState = Immutable.Map({
	effects: _.keys(Effects),
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