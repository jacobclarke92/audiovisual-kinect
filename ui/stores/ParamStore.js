import Immutable from 'immutable';

import * as StoreUtils from '../utils/StoreUtils';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

let params = Immutable.fromJS([

	{family: 'Effect', name: 'param1', label: 'Effect Param Label 1', value: 50, min: 0, max: 110, step: 1},
	{family: 'Effect', name: 'param2', label: 'Effect Param Label 2', value: 50, min: 0, max: 120, step: 1},
	{family: 'Effect', name: 'param3', label: 'Effect Param Label 3', value: 50, min: 0, max: 130, step: 1},
	{family: 'Effect', name: 'param4', label: 'Effect Param Label 4', value: 50, min: 0, max: 140, step: 1},
	{family: 'Effect', name: 'param5', label: 'Effect Param Label 5', value: 50, min: 0, max: 150, step: 1},
	{family: 'Effect', name: 'param6', label: 'Effect Param Label 6', value: 50, min: 0, max: 160, step: 1},
	{family: 'Effect', name: 'param7', label: 'Effect Param Label 7', value: 50, min: 0, max: 170, step: 1},

	{family: 'Filter', name: 'param1', label: 'Filter Param Label 1', value: 50, min: 0, max: 110, step: 1},
	{family: 'Filter', name: 'param2', label: 'Filter Param Label 2', value: 50, min: 0, max: 120, step: 1},
	{family: 'Filter', name: 'param3', label: 'Filter Param Label 3', value: 50, min: 0, max: 130, step: 1},
	{family: 'Filter', name: 'param4', label: 'Filter Param Label 4', value: 50, min: 0, max: 140, step: 1},
	{family: 'Filter', name: 'param5', label: 'Filter Param Label 5', value: 50, min: 0, max: 150, step: 1},
	{family: 'Filter', name: 'param6', label: 'Filter Param Label 6', value: 50, min: 0, max: 160, step: 1},
	{family: 'Filter', name: 'param7', label: 'Filter Param Label 7', value: 50, min: 0, max: 170, step: 1},
	
	{family: 'Calibration', name: 'param1', label: 'Calibration Param Label 1', value: 50, min: 0, max: 110, step: 1},
	{family: 'Calibration', name: 'param2', label: 'Calibration Param Label 2', value: 50, min: 0, max: 120, step: 1},
	{family: 'Calibration', name: 'param3', label: 'Calibration Param Label 3', value: 50, min: 0, max: 130, step: 1},
	{family: 'Calibration', name: 'param4', label: 'Calibration Param Label 4', value: 50, min: 0, max: 140, step: 1},
	{family: 'Calibration', name: 'param5', label: 'Calibration Param Label 5', value: 50, min: 0, max: 150, step: 1},
	{family: 'Calibration', name: 'param6', label: 'Calibration Param Label 6', value: 50, min: 0, max: 160, step: 1},
	{family: 'Calibration', name: 'param7', label: 'Calibration Param Label 7', value: 50, min: 0, max: 170, step: 1}
	
]);

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