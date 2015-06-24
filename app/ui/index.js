import SocketUtil from '../utils/SocketUtil';

let socketUtil = new SocketUtil('UI');
socketUtil.send('deviceActive', null);

console.log('████████ STARTING UI █████████');