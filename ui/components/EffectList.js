import React from 'react';
import Slider from './Slider';
import AppActions from '../actions/AppActions';

export default class EffectList {

	itemClick(item, event) {
		AppActions.effectChanged(item);
	}

	render() {
		const items = this.props.items.map(item => (
			<li onClick={this.itemClick.bind(this, item)}>{item}</li>
		));
		return <ul>{items}</ul>;
	}

}