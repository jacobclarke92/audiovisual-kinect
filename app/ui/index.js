import SocketUtil from '../utils/SocketUtil';
import Dispatcher from '../core/Dispatcher';

let socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

console.log('████████ STARTING UI █████████');