import _ from 'lodash';
import Immutable from 'immutable';
import { EFFECT_ADD, EFFECT_CHANGE } from '../actions/ActionTypes';
import Effects from '../effects/index';

const effectList = _.keys(Effects);
const initialState = Immutable.fromJS({
	effectList,
	currentEffect: effectList[0],
});

export function effects(state = initialState, action = {}) {
	const { effectName } = action;
	switch (action.type) {
		case EFFECT_ADD:
			return state.update('effectList', list => list.push(effectName));
		case EFFECT_CHANGE:
			return state.set('currentEffect', effectName);
		default:
			return state;
	}
}