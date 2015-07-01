import { EventEmitter } from 'events';
import _ from 'lodash';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

let paramGroups = Immutable.fromJS({

	effect: {
		param1: {name: 'param1', label: 'Effect Param Label 1', value: 50, min: 0, max: 110},
		param2: {name: 'param2', label: 'Effect Param Label 2', value: 50, min: 0, max: 120},
		param3: {name: 'param3', label: 'Effect Param Label 3', value: 50, min: 0, max: 130},
		param4: {name: 'param4', label: 'Effect Param Label 4', value: 50, min: 0, max: 140},
		param5: {name: 'param5', label: 'Effect Param Label 5', value: 50, min: 0, max: 150},
		param6: {name: 'param6', label: 'Effect Param Label 6', value: 50, min: 0, max: 160},
		param7: {name: 'param7', label: 'Effect Param Label 7', value: 50, min: 0, max: 170}
	},

	core: {
		Filters: {
			param1: {name: 'param1', label: 'Filter Param Label 1', value: 50, min: 0, max: 110},
			param2: {name: 'param2', label: 'Filter Param Label 2', value: 50, min: 0, max: 120},
			param3: {name: 'param3', label: 'Filter Param Label 3', value: 50, min: 0, max: 130},
			param4: {name: 'param4', label: 'Filter Param Label 4', value: 50, min: 0, max: 140},
			param5: {name: 'param5', label: 'Filter Param Label 5', value: 50, min: 0, max: 150},
			param6: {name: 'param6', label: 'Filter Param Label 6', value: 50, min: 0, max: 160},
			param7: {name: 'param7', label: 'Filter Param Label 7', value: 50, min: 0, max: 170}
		},
		Calibration: {
			param1: {name: 'param1', label: 'Calibration Param Label 1', value: 50, min: 0, max: 110},
			param2: {name: 'param2', label: 'Calibration Param Label 2', value: 50, min: 0, max: 120},
			param3: {name: 'param3', label: 'Calibration Param Label 3', value: 50, min: 0, max: 130},
			param4: {name: 'param4', label: 'Calibration Param Label 4', value: 50, min: 0, max: 140},
			param5: {name: 'param5', label: 'Calibration Param Label 5', value: 50, min: 0, max: 150},
			param6: {name: 'param6', label: 'Calibration Param Label 6', value: 50, min: 0, max: 160},
			param7: {name: 'param7', label: 'Calibration Param Label 7', value: 50, min: 0, max: 170}
		}
	}

});

var AppStore = _.extend({}, EventEmitter.prototype, {
  
  getParamGroup: function(paramsPath) {
  	return paramGroups.getIn(paramsPath);
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
  	this.on('change', callback);
  },

  removeChangeListener: function(callback) {
  	this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(payload) {
 
  switch(payload.type) {

  	case AppConstants.PARAM_VALUE_UPDATED:
  		paramGroups = paramGroups.setIn(['effect', payload.name, 'value'], payload.value);
  		break;

  	default:
  		return true;
  }

  AppStore.emitChange();
  return true;

});

module.exports = AppStore;
