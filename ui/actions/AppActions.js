import AppDispatcher from '../AppDispatcher';
import AppConstants from '../constants/AppConstants';
import SocketUtil from '../../app/utils/SocketUtil';

const socketUtil = new SocketUtil('UI');

export default {
	paramValueUpdated: function(family, name, value) {
		AppDispatcher.dispatch({
			type: AppConstants.PARAM_VALUE_UPDATED,
			family,
			name,
			value
		});
		socketUtil.send('paramUpdated', null);
	}
}

