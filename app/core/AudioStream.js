import SocketUtil from '../utils/SocketUtil';
let socketUtil = new SocketUtil();

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let streamInstance = null;

let sourceNode = null;
let analyserNode = null;
let javascriptNode = null;

let amplitudeArray = null;
let frequencyArray = null;

let audioStreamEnabled = false;
let audioStreamRequestGranted = false;

const session = { audio: true, video: false };
const fftSize = 1024;
const smoothingTimeConstant = 0.5;

function requestAudioStream() {

	navigator.getUserMedia(session, configureAudioStream, function() {
		console.warn('Error gaining mic access');
		audioStreamRequestGranted = false;
		setTimeout(() => requestAudioStream(), 2000);
	});
}

function stopAudioStream() {

	if(streamInstance) {
		streamInstance.stop();
		streamInstance = null;
	}

	socketUtil.send('serviceStatus', { service: 'audio', active: false });
}

function configureAudioStream(stream) {
	
	console.log('Mic access granted');
	audioStreamRequestGranted = true;
	streamInstance = stream;

	sourceNode = audioContext.createMediaStreamSource(stream);
	analyserNode = audioContext.createAnalyser();
	analyserNode.fftSize = fftSize;
	analyserNode.smoothingTimeConstant = smoothingTimeConstant;

	javascriptNode = audioContext.createScriptProcessor(fftSize, 1, 1);
	javascriptNode.onaudioprocess = () => updateAudioStreamData();

	sourceNode.connect(analyserNode);
	analyserNode.connect(javascriptNode);
	javascriptNode.connect(audioContext.destination);

	socketUtil.send('serviceStatus', { service: 'audio', active: true });

}

function updateAudioStreamData() {

	if(!audioStreamEnabled) return;

	amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
	analyserNode.getByteTimeDomainData(amplitudeArray);

	frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
	analyserNode.getByteFrequencyData(frequencyArray);

}

export default class AudioStream {

	constructor() {
		
	}

	start() {
		audioStreamEnabled = true;
		if(audioStreamRequestGranted) return;
		requestAudioStream();
	}

	stop() {
		audioStreamEnabled = false;
		if(!audioStreamRequestGranted) return;
		stopAudioStream();
	}

	process() {

		if(!audioStreamEnabled || !audioStreamRequestGranted) return;



	}

	getVolume() {

		if(!audioStreamEnabled || !audioStreamRequestGranted) return 0;
		let volume = 0;
		for(let index in amplitudeArray) {
			volume += amplitudeArray[index] - 128;
		}
		return Math.abs(Math.round(volume));

	}

}