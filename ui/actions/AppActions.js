import AppDispatcher from '../AppDispatcher';
import AppConstants from '../constants/AppConstants';
import SocketUtil from '../../app/utils/SocketUtil';

const socketUtil = new SocketUtil('UI');

export default {
	paramValueUpdated: function(param, family, name, value) {
		AppDispatcher.dispatch({
			type: AppConstants.PARAM_VALUE_UPDATED,
			family,
			name,
			value
		});
		socketUtil.send('paramUpdated', param.toJS());
	},
	effectChanged: function(effectName) {
		AppDispatcher.dispatch({
			type: AppConstants.EFFECT_CHANGED,
			effectName
		});
		socketUtil.send('effectChanged', effectName);
	},
	effectListReceived: function(list) {
		AppDispatcher.dispatch({
			type: AppConstants.EFFECT_LIST_RECEIVED,
			list
		});
	}
}

