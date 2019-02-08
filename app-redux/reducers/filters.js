import _ from 'lodash';
import Immutable from 'immutable';
import Filters from '../filters/index';

const filterList = _.keys(Filters);
let filterInstances = {};
filterList.forEach(function(val) {
	filterInstances[val] = Filters[val];
});

const rgbSplit = new filterInstances['rgbSplit']();
console.log(rgbSplit);
rgbSplit.update(rgbSplit.getParamDefaults());

const initialState = Immutable.fromJS({
	filterList,
	filterInstances,
});

export function filters(state = initialState, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}