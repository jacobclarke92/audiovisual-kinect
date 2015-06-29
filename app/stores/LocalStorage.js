import storage from 'node-persist';
import Immutable from 'immutable';

import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import * as EffectStore from './stores/Effects';

storage.initSync();


AppDispatcher.register(function(payload) {
	if(payload.type === ActionTypes.UPDATE_EFFECT_PARAM) {
		console.log('LocalStorage store intercepted param update', payload);
	}
});
