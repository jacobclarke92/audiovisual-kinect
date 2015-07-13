import SocketIO from 'socket.io-client';
let socket = SocketIO.connect('http://localhost:5600/');

const defaultDevice = 'Core';

export default class SocketUtil {

	constructor(device) {
		this.device = (device || defaultDevice);
	}

	send(messageName, messageData) {

		console.log('Broadcasting SET for '+messageName);
		socket.emit(messageName, {
			request: 'SET',
			deviceName: this.device,
			data: messageData
		});

	}

	listen(messageName, callback) {

		console.log('Listening for '+messageName);
		socket.on(messageName, function(data) {
			if(data.request == 'SET') {
				// console.log('Intercepted SET broadcast for '+messageName);
				callback(data);
			}
		});
	}

	request(messageName) {

		console.log('Emitting request for '+messageName);
		socket.emit(messageName, {
			request: 'GET',
			deviceName: this.device
		})
	}

	listenAndReturn(messageName, returnDataObject) {
		const _device = this.device;
		socket.on(messageName, function(data) {
			if(data.request == 'GET') {
				console.log('Intercepted GET request for '+messageName, returnDataObject);

				let sendObject = null;
				if(typeof returnDataObject == 'function') {
					sendObject = returnDataObject();
				}else{
					sendObject = returnDataObject;
				}

				console.log('Emitting response', sendObject);
				socket.emit(messageName, {
					request: 'SET',
					deviceName: _device,
					data: sendObject
				});
			}
		});
	}

}