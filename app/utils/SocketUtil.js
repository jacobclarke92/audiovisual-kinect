import SocketIO from 'socket.io-client';
let socket = SocketIO.connect('http://localhost:3000/');

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
		socket.on(messageName, function(data) {
			if(data.request == 'SET') {
				console.log('Intercepted SET broadcast for '+messageName);
				callback(data);
			}
		});
	}

	listenAndReturn(messageName, returnDataObject) {
		socket.on(messageName, function(data) {
			if(data.request == 'GET') {
				console.log('Intercepted GET request for '+messageName, returnDataObject);

				let sendObject = null;
				if(typeof returnDataObject == 'function') {
					sendObject = returnDataObject();
				}else{
					sendObject = returnDataObject;
				}

				socket.emit(messageName, {
					request: 'SET',
					deviceName: this.device,
					data: sendObject
				});
			}
		});
	}

}