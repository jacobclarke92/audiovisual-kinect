import _ from 'lodash';
import Immutable from 'immutable';
import Filters from '../filters/index';

const filterList = _.keys(Filters);
const filterInstances = filterList.map(function(val) {
	let obj = {}
	obj[val] = new Filters[val]();
	return obj;
})
console.log(filterInstances);
const initialState = Immutable.fromJS({
	filterList,
});

export function filters(state = initialState, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}