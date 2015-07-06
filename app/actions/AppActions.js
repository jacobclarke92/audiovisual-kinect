import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export function updateParam(data) {

	AppDispatcher.dispatch({
		type: ActionTypes.PARAM_VALUE_UPDATED,
		data
	});

}

export function changeEffect(data) {

	console.log('Dispatching EFFECT_CHANGED')

	AppDispatcher.dispatch({
		type: ActionTypes.EFFECT_CHANGED,
		data
	});

}

export function effectMounted(data) {

	console.log('Dispatching EFFECT_MOUNTED')

	AppDispatcher.dispatch({
		type: ActionTypes.EFFECT_MOUNTED,
		data
	});

}