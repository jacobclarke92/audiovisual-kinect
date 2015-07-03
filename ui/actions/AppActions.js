import AppDispatcher from '../AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {
	paramValueUpdated: function(family, name, value) {
		AppDispatcher.dispatch({
			type: AppConstants.PARAM_VALUE_UPDATED,
			family,
			name,
			value
		})
	}
}

