import Fragment from './KaleidoscopeFilterFragment.glsl';

function KaleidoscopeFilter() {

    PIXI.filters.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        Fragment,
        // custom uniforms
        {
            sides: { type: '1f', value: 5.0 },
            angle: { type: '1f', value: 0.0 },
            tDiffuse: {type: 't', value: null}
        }
    );

}

KaleidoscopeFilter.prototype = Object.create(PIXI.filters.AbstractFilter.prototype);
KaleidoscopeFilter.prototype.constructor = KaleidoscopeFilter;
module.exports = KaleidoscopeFilter;

Object.defineProperties(KaleidoscopeFilter.prototype, {
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