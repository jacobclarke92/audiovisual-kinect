import React from 'react';
import App from './components/App';

React.render(
	<App />,
	document.getElementById('flux-ui')
);

/*
import SocketUtil from '../app/utils/SocketUtil';
import ActionTypes from '../app/constants/ActionTypes';
import AppDispatcher from '../app/AppDispatcher';

let socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

console.log('████████ STARTING UI █████████');

window.addEventListener('click', function(event) {
	console.log('click');
	socketUtil.send(ActionTypes.UPDATE_EFFECT_PARAM, {
		effect: 'Rain',
		param: {
			name: 'lineThickness',
			value: 3
		}
	});
});


socketUtil.listen('effectParam', function(data) {
	if(data.deviceName != 'Core') return;

	console.log('received effect param update from Core');
});

socketUtil.listen('serviceStatus', function(data) {
	if(data.deviceName != 'Core') return;

	console.log('received service status update from Core');
});
*/