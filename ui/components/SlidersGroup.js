import React from 'react';
import Slider from './Slider';
import AppActions from '../actions/AppActions';

export default class SlidersGroup {

	handleSliderChange(item, event) {
		AppActions.paramValueUpdated(item.get('name'), parseFloat(event.target.value));
	}

	render() {
		const items = this.props.items.toArray().map(item => (
			<Slider key={item.get('name')} onChange={this.handleSliderChange.bind(this, item)} {...item.toJS()}  />
		));
		return <div>{items}</div>;
	}

}