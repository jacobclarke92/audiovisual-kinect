import React from 'react';
import ComponentSliders from './ComponentSliders.react';

import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

let App = React.createClass({
	
	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {

	},

	componentWillMount: function() {
		this.props = {
			effectParams: [
				{name:'param1', value: 50, min: 0, max: 110},
				{name:'param2', value: 50, min: 0, max: 120},
				{name:'param3', value: 50, min: 0, max: 130},
				{name:'param4', value: 50, min: 0, max: 140},
				{name:'param5', value: 50, min: 0, max: 150},
				{name:'param6', value: 50, min: 0, max: 160},
				{name:'param7', value: 50, min: 0, max: 170}
			]
		};
	},

	componentWillUnmount: function() {

	},


	handleSliderChange: function(event) {
		console.log(event);
	},

	render: function() {
		return (
			<div className="app">
				<p>Hello</p>
				<ComponentSliders params={this.props.effectParams} />
			</div>
		);
	}

});

module.exports = App;