import PIXI from 'pixi.js/bin/pixi';
import ExtraFilters from '../filters/index';
import ParamStore from '../stores/Params';

console.log(ExtraFilters);

export default class Filters {

	constructor(renderer) {
		// this.displacementFilter 	= new PIXI.filters.DisplacementFilter(displacementTexture);
		this.blurFilter 			= new PIXI.filters.BlurFilter();
		this.pixelateFilter 		= new PIXI.filters.PixelateFilter();
		this.invertFilter 			= new PIXI.filters.InvertFilter();
		this.rgbSplitFilter 		= new PIXI.filters.RGBSplitFilter();
		this.twistFilter 			= new PIXI.filters.TwistFilter();
		this.glowFilter				= new ExtraFilters.GlowFilter(renderer.width, renderer.height, 15, 100, 0, 0xFFFFFF, 0.1);
		this.outlineFilter 			= new ExtraFilters.OutlineFilter(renderer.width, renderer.height, 5, 0xFFFFFF);

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

		this.filters = [];
		if(rgbSplit !== 0) 	this.filters.push(this.rgbSplitFilter);
		if(twist 	!== 0) 	this.filters.push(this.twistFilter);
		if(blur 	!== 0) 	this.filters.push(this.blurFilter);
		if(pixelate !== 0) 	this.filters.push(this.pixelateFilter);
		if(glow 	!== 0) 	this.filters.push(this.glowFilter);
		if(outline 	!== 0)	this.filters.push(this.outlineFilter);
	}

	get() {
		return (this.filters.length === 0) ? null : this.filters;
	}

}