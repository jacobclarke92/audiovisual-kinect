import Immutable from 'immutable';
import * as StoreUtils from '../utils/StoreUtils';
import AppDispatcher from '../AppDispatcher';

AppDispatcher.register(function(payload) {
 
  switch(payload.type) {

  	case AppConstants.PARAM_VALUE_UPDATED:
  		const index = params.findIndex(function(obj) {
  			return (obj.get('name') === payload.name && obj.get('family') === payload.family);
  		});
  		params = params.setIn([index, 'value'], payload.value);
  		break;

  	default:
  		return true;
  }

  ParamStore.emitChange();
  return true;

});

const ParamStore = StoreUtils.createStore({
  
  getParamsByFamily(family) {
    return params.filter(function(obj) {
      return obj.get('family') === family;
    });
  },

  loadNewEffectParams(paramArray) {
    const paramsWithoutEffect = params.filter(function(obj) {
      return obj.get('family') !== 'Effect';
    });
    const newParams = paramsWithoutEffect.concat(Immutable.fromJS(paramArray))
    params = newParams;
  }

});

export default ParamStore;