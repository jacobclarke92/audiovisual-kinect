import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export function updateEffectParam(data) {

	AppDispatcher.dispatch({
		type: ActionTypes.UPDATE_EFFECT_PARAM,
		data
	});

}