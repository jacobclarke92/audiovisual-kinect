import PIXI from 'pixi.js/bin/pixi';
import ExtraFilters from '../filters/index';
import ParamStore from '../stores/Params';

console.log(ExtraFilters);

export default class Filters {

	constructor(renderer) {
		
		this.displacementTexture 	= PIXI.Sprite.fromImage("/webroot/img/displacement/001.jpg");

		this.blurFilter 			= new PIXI.filters.BlurFilter();
		this.pixelateFilter 		= new PIXI.filters.PixelateFilter();
		this.invertFilter 			= new PIXI.filters.InvertFilter();
		this.rgbSplitFilter 		= new PIXI.filters.RGBSplitFilter();
		this.twistFilter 			= new PIXI.filters.TwistFilter();
		this.glowFilter				= new ExtraFilters.GlowFilter(renderer.width, renderer.height, 15, 100, 0, 0xFFFFFF, 0.1);
		this.outlineFilter 			= new ExtraFilters.OutlineFilter(renderer.width, renderer.height, 5, 0xFFFFFF);
		this.kaleidoscopeFilter		= new ExtraFilters.KaleidoscopeFilter();
		this.tiltshiftFilter 		= new PIXI.filters.TiltShiftFilter();
		this.displacementFilter 	= new PIXI.filters.DisplacementFilter(this.displacementTexture);

		console.log("******");
		console.log(this.glowFilter);

		this.blurFilter.passes = 5;
		this.rgbSplitFilter.green.x = this.rgbSplitFilter.red.y = this.rgbSplitFilter.green.y = this.rgbSplitFilter.blue.y = 0;

		this.filters = [];

		window.test = this.outlineFilter;

	}

	update() {

		const rgbSplit = ParamStore.getParamValue('Filter', 'rgbSplit');
		this.rgbSplitFilter.red.x = rgbSplit;
		this.rgbSplitFilter.blue.x = -rgbSplit;

		const twist = ParamStore.getParamValue('Filter', 'twist');
		this.twistFilter.angle = twist;

		const blur = ParamStore.getParamValue('Filter', 'blur');
		this.blurFilter.blur = blur;

		const pixelate = ParamStore.getParamValue('Filter', 'pixelate');
		this.pixelateFilter.size.x = this.pixelateFilter.size.y = pixelate;	

		const glow = ParamStore.getParamValue('Filter', 'glow');
		this.glowFilter.distance = glow;		

		const outline = ParamStore.getParamValue('Filter', 'outline');
		this.outlineFilter.thickness = outline;

		const tiltshift = ParamStore.getParamValue('Filter', 'tiltshift');
		this.tiltshiftFilter.blur = tiltshift;

		const invert = ParamStore.getParamValue('Filter', 'invert');
		this.invertFilter.invert = invert;

		const displacement = ParamStore.getParamValue('Filter', 'displacement');
		this.displacementFilter.scale.x = this.displacementFilter.scale.y = displacement;

		const kaleidoscopeSides = ParamStore.getParamValue('Filter', 'kaleidoscopeSides');
		const kaleidoscopeAngle = ParamStore.getParamValue('Filter', 'kaleidoscopeAngle');
		this.kaleidoscopeFilter.sides = kaleidoscopeSides;
		this.kaleidoscopeFilter.angle = kaleidoscopeAngle;

		this.filters = [];
		if(twist 	!== 0) 	this.filters.push(this.twistFilter);
		if(rgbSplit !== 0) 	this.filters.push(this.rgbSplitFilter);
		if(pixelate !== 0) 	this.filters.push(this.pixelateFilter);
		if(blur 	!== 0) 	this.filters.push(this.blurFilter);
		if(glow 	!== 0) 	this.filters.push(this.glowFilter);
		if(outline 	!== 0)	this.filters.push(this.outlineFilter);
		if(tiltshift!== 0)	this.filters.push(this.tiltshiftFilter);
		if(invert 	!== 0)	this.filters.push(this.invertFilter);
		if(displacement 	 !== 0)	this.filters.push(this.displacementFilter);
		if(kaleidoscopeSides !== 0)	this.filters.push(this.kaleidoscopeFilter);
	}

	get() {
		return (this.filters.length === 0) ? null : this.filters;
	}

}