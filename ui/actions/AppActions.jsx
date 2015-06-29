import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {
	paramValueChanged: function(props) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.PARAM_VALUE_UPDATED,
			props: props
		})
	}
}