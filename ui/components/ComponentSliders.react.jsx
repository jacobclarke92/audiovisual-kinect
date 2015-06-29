import React from 'react';
import ComponentSlider from './ComponentSlider.react';

let ComponentSliders = React.createClass({

	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {

	},

	componentWillMount: function() {
		console.log(this.props);
	},

	componentWillUnmount: function() {

	},

	render: function() {
		return (
			<div>
			{(this.props.params || []).map(function(param, i) {
				return <ComponentSlider param={param} />;
			})}
			</div>
		);
	}

});

module.exports = ComponentSliders;