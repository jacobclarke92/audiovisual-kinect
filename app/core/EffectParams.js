class EffectParams {

	constructor() {
		this.params = {};
	}

	addParam(_name, _min, _max, _default, _step) {
		this.params[_name] = new EffectParam(_name, _min, _max, _default, _step);
	}

	updateParamValue(_name, _value) {
		this.params[_name].value = _value;
	}

	reset() {
		this.params = {};
	}

}


class EffectParam {
	constructor(_name, _min, _max, _default, _step) {
		this.name = _name;
		this.min = _min;
		this.max = _max;
		this.default = _default;
		this.value = _default;
		this.step = _step;
	}
}