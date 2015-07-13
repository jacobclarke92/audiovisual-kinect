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

	ParamStore.loadFamilyOfParams('Effect', data.data);
});

socketUtil.listen('filterParams', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received filter params from Core:', data.data);

	ParamStore.loadFamilyOfParams('Filter', data.data);
});

socketUtil.listen('calibrationParams', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received calibration params from Core:', data.data);

	ParamStore.loadFamilyOfParams('Calibration', data.data);
});

socketUtil.listen('effectList', function(data) {
	if(data.deviceName !== 'Core') return;
	console.log('received effect list from Core:', data.data.effectList);

	AppActions.effectListReceived(data.data.effectList);
});

socketUtil.request('effectList');
socketUtil.request('effectParams');
socketUtil.request('filterParams');
