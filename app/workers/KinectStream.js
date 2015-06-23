export default function doWork() {

	var imageEventSource;
	var running = false;

	self.onmessage = function(e) {

		if(e.data.cmd == 'start') {

			running = true;
			console.log('FROM WORKER', e);
			var imageStreamPath = (e.data.path) ? e.data.path : '/images';

			console.info('image worker initing');
			imageEventSource = new EventSource(imageStreamPath);
			imageEventSource.addEventListener('message', function(event) {

				if(running) {
					
					if(event.data.substring(0,14) == 'data:image/png' ) {

						self.postMessage({

							'image': event.data

						});
						
					}
				}else{

					event.target.close();

				}			
			});

		}else if(e.data.cmd == 'stop') {
			console.warn('image loader stopping!');
			running = false;
			imageEventSource.removeEventListener('message');
			imageEventSource = false;
		}

	}
}