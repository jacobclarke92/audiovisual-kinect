import SocketUtil from '../utils/SocketUtil';
import * as AppActions from '../actions/AppActions';

let socketUtil = new SocketUtil();

socketUtil.listen('effectParam', function(data) {
	console.log('Effect param update received', data);
	AppActions.updateEffectParam(data);
});
