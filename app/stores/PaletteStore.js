import Immutable from 'immutable';

let colours = Immutable.fromJS([
	{hex: '#0000FF', name: 'Blue'}
]);

export function getRandomColour() {
	return colours.get(0);
}