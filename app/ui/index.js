import SocketUtil from '../utils/SocketUtil';
import AppDispatcher from '../AppDispatcher';

let socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

console.log('████████ STARTING UI █████████');