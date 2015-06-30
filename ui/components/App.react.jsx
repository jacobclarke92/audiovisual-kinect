import React from 'react';
import ComponentSliders from './Sliders.react';

import AppActions from '../actions/AppActions';

let App = React.createClass({
	
	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {

	},

	componentWillMount: function() {

	},

	componentWillUnmount: function() {

	},

	render: function() {
		return (
			<div className="app">
				<p>Hello</p>
				<ComponentSliders paramsPath={['effect','Rain']} />
			</div>
		);
	}

});

module.exports = App;