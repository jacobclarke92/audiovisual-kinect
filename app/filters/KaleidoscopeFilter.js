import Frag from './KaleidoscopeFilterFrag.glsl';
import Vert from './KaleidoscopeFilterVert.glsl';

console.log(Frag);

function KaleidoscopeFilter() {

    PIXI.filters.AbstractFilter.call(this,
        // vertex shader
        Vert,
        // fragment shader
        Frag,
        // custom uniforms
        {
            sides: { type: '1f', value: 1.0 },
            angle: { type: '1f', value: 0.0 },
            tDiffuse: {type: 't', value: null}
        }
    );

}

KaleidoscopeFilter.prototype = Object.create(PIXI.filters.AbstractFilter.prototype);
KaleidoscopeFilter.prototype.constructor = KaleidoscopeFilter;
module.exports = KaleidoscopeFilter;

Object.defineProperties(KaleidoscopeFilter.prototype, {
    /**
     * The strength of the invert. `1` will fully invert the colors, and
     * `0` will make the object its normal color.
     *
     * @member {number}
     * @memberof KaleidoscopeFilter#
     */
    sides: {
        get: function ()
        {
            return this.uniforms.sides.value;
        },
        set: function (value)
        {
            this.uniforms.sides.value = value;
        }
    },
    angle: {
        get: function ()
        {
            return this.uniforms.angle.value;
        },
        set: function (value)
        {
            this.uniforms.angle.value = value;
        }
    }
});




/*

// From: http://pixelshaders.com/editor/

precision mediump float;

varying vec2 position;
uniform sampler2D webcam;

void main() {
  // normalize to the center
  vec2 p = position - 0.5;
  
  // cartesian to polar coordinates
  float r = length(p);
  float a = atan(p.y, p.x);
  
  // kaleidoscope
  float sides = 10.;
  float tau = 2. * 3.1416;
  a = mod(a, tau/sides);
  a = abs(a - tau/sides/2.);
  
  // polar to cartesian coordinates
  p = r * vec2(cos(a), sin(a));
  
  // sample the webcam
  vec4 color = texture2D(webcam, p + 0.5);
  gl_FragColor = color;
}
*/



/*

// Pinched from http://lab.weworkweplay.com/kaleidoscope/js/shaders/KaleidoShader.js

THREE.KaleidoShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"sides":    { type: "f", value: 6.0 },
		"angle":    { type: "f", value: 0.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float sides;",
		"uniform float angle;",
		
		"varying vec2 vUv;",

		"void main() {",

			"vec2 p = vUv - 0.5;",
			"float r = length(p);",
			"float a = atan(p.y, p.x) + angle;",
			"float tau = 2. * 3.1416 ;",
			"a = mod(a, tau/sides);",
			"a = abs(a - tau/sides/2.) ;",
			"p = r * vec2(cos(a), sin(a));",
			"vec4 color = texture2D(tDiffuse, p + 0.5);",
			"gl_FragColor = color;",

		"}"

	].join("\n")

};

*/