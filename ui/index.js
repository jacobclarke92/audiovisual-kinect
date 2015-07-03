import React from 'react';
import App from './components/App';
import SocketUtil from '../app/utils/SocketUtil';
import ParamStore from './stores/Params';

console.log('████████ STARTING UI █████████');

React.render(
	<App />,
	document.getElementById('flux-ui')
);



const socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

socketUtil.listen('effectParams', function(data) {
	if(data.deviceName != 'Core') return;

	console.log('received effect param update from Core');
});

socketUtil.listen('serviceStatus', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received service status update from Core: ', data.data);
});

socketUtil.listen('effectParams', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received effect params from Core:', data.data);

	ParamStore.loadNewEffectParams(data.data);
});