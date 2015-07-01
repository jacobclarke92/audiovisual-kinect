import React from 'react';
import ComponentSliders from './Sliders.react';
import ComponentEffectList from './EffectList.react';
import ComponentTabs from 'react-simpletabs';

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
				<ComponentTabs>

					<ComponentTabs.Panel title='Effect List'>
						<ComponentEffectList />
					</ComponentTabs.Panel>

					<ComponentTabs.Panel title='Effect Params'>
						<ComponentSliders key='effectParams' paramsPath={['effect','Rain']} />
					</ComponentTabs.Panel>

					<ComponentTabs.Panel title='Filter Params'>
						<ComponentSliders key='filterParams' paramsPath={['core','Filters']} />
					</ComponentTabs.Panel>

					<ComponentTabs.Panel title='Calibration'>
						<ComponentSliders key='calibrationParams' paramsPath={['core','Calibration']} />
					</ComponentTabs.Panel>

				</ComponentTabs>
			</div>
		);
	}

});

module.exports = App;