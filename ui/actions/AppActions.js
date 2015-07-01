import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {
	paramValueUpdated: function(name, value) {
		AppDispatcher.dispatch({
			type: AppConstants.PARAM_VALUE_UPDATED,
			name,
			value
		})
	}
}

