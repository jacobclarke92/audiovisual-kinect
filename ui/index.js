import React from 'react';
import App from './components/App';
import AppActions from './actions/AppActions';
import SocketUtil from '../app/utils/SocketUtil';
import ParamStore from './stores/Params';
import EffectStore from './stores/Effects';

console.log('████████ STARTING UI █████████');

React.render(
	<App />,
	document.getElementById('flux-ui')
);



const socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

socketUtil.listen('serviceStatus', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received service status update from Core: ', data.data);
});

socketUtil.listen('effectParams', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received effect params from Core:', data.data);

	ParamStore.loadNewEffectParams(data.data);
});

socketUtil.listen('effectList', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received effect list from Core:', data.data.effectList);

	AppActions.effectListReceived(data.data.effectList);
});

socketUtil.send('effectParams', null);