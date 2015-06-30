import React from 'react';
import AppActions from '../actions/AppActions';
import ComponentSlider from './Slider.react';
import ParamStore from '../stores/ParamStore';

let ComponentSliders = React.createClass({

	getInitialState: function() {
		return {
			params: ParamStore.getParamGroup(this.props.paramsPath)
		};
	},

	componentDidMount: function() {

	},

	componentWillMount: function() {
		console.log(this.state);
		ParamStore.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			params: ParamStore.getParamGroup(this.props.paramsPath)
		});
	},

	componentWillUnmount: function() {

	},

	handleSliderChange: function(event) {
		// console.log(event.target.name+' '+event.target.value);

		let sliderName = event.target.name;
		let sliderValue = parseFloat(event.target.value);

		let action = this.state.params[event.target.name];
		action.value = sliderValue;
		action.paramPath = this.props.paramsPath;
		AppActions.paramValueUpdated(action);
	},

	render: function() {
		
		let rows = [];
		for(let key in this.state.params) {
			rows.push( <ComponentSlider param={this.state.params[key]} onChange={this.handleSliderChange} /> );
		}

		return ( <div>{rows}</div> );
	}

});

module.exports = ComponentSliders;