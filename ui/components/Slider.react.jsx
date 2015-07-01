import React from 'react';

let ComponentSlider = React.createClass({

	getInitialState: function() {
		return null;
	},

	componentWillMount: function() {
		
	},

	componentDidMount: function() {

	},

	componentWillUnmount: function() {

	},

	render: function() {
		return (
			<div className="slider">
				<label htmlFor={this.props.param.name}>{this.props.param.label} </label>
				<input key={this.props.param.name} onInput={this.props.onChange} type="range" min={this.props.param.min} max={this.props.param.max} defaultValue={this.props.param.value} name={this.props.param.name} id={this.props.param.name} step={this.props.param.step || 1} />
				<span>{this.props.param.value}</span>
			</div>
		);
	}

});

module.exports = ComponentSlider;