import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export function updateParam(data) {

	AppDispatcher.dispatch({
		type: ActionTypes.UPDATE_PARAM,
		data
	});

}