import SocketUtil from '../utils/SocketUtil';
import EffectActionCreators from '../actions/EffectActionCreators';

let socketUtil = new SocketUtil();

socketUtil.listen('effectParam', function(data) {
	console.log('Effect param update received', data);
	EffectActionCreators.updateEffectParam(data)
});
