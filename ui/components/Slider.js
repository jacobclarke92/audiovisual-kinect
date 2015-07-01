import React from 'react';

export default class Slider {

	render() {
		return (
			<div className="slider">
				<label htmlFor={this.props.name}>{this.props.label} </label>
				<input key={this.props.name}
						type="range"
						id={this.props.name}
						step={this.props.step || 1}
						{...this.props}
				/>
				<span>{this.props.value}</span>
			</div>
		);
	}

}