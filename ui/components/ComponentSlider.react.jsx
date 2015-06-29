import React from 'react';

let ComponentSlider = React.createClass({

	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {

	},

	componentWillMount: function() {
		console.log(this.props);
		this.props.sliderID = "range_"+this.props.param.name;
	},

	componentWillUnmount: function() {

	},

	handleSliderChange: function(event) {
		console.log(event);
	},

	render: function() {
		return (
			<div>
				<label for={this.props.sliderID}>{this.props.param.name} </label>
				<input key={this.props.param.name} onInput={this.handleSliderChange} type="range" min={this.props.param.min} max={this.props.param.max} defaultValue={this.props.param.value} id={this.props.sliderID} step="1" />
			</div>
		);
	}

});

module.exports = ComponentSlider;