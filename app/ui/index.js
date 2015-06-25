import SocketUtil from '../utils/SocketUtil';
import AppDispatcher from '../AppDispatcher';

let socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

console.log('████████ STARTING UI █████████');

window.addEventListener('click', function(event) {
	console.log('click');
	socketUtil.send('effectParam', {
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