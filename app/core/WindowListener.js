import $ from 'jquery'


export default class WindowListener {

	constructor() {
		this.windowWidth = 0;
		this.windowHeight = 0;

		this.startDrawX = 0;
		this.startDrawY = 0;
		this.endDrawX = 0;
		this.endDrawY = 0;
	}

	init() {
		console.log('WindowListener init');
		$(window).unbind('resize').bind('resize', this.windowResized);
		this.windowResized();
	}

	windowResized() {
		this.windowWidth = $(window).width();
		this.windowHeight = $(window).height();

		console.log(this.windowWidth + ' x ' + this.windowHeight);
	}

	getWindowSize() {
		this.windowResized();
		return {
			width: this.windowWidth,
			height: this.windowHeight
		}
	}
}