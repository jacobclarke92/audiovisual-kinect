import Immutable from 'immutable';
import * as StoreUtils from '../utils/StoreUtils';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../constants/AppConstants';

let effects = Immutable.List();

AppDispatcher.register(function(payload) {
 
  switch(payload.type) {

  	case AppConstants.EFFECT_LIST_RECEIVED:
  		console.log('effect list updated through dispatcher directly to effects store', payload);
  		effects = Immutable.fromJS(payload.list);
  		break;

  	default:
  		return true;
  }

  EffectStore.emitChange();
  return true;

});

const EffectStore = StoreUtils.createStore({
  
	get() {
		return effects;
	}

});

export default EffectStore;