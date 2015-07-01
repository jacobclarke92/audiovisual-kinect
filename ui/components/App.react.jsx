import React from 'react';
import ComponentSliders from './Sliders.react';
import ComponentEffectList from './EffectList.react';
import ReactTabs from 'react-tabs';

import AppActions from '../actions/AppActions';


let Tab = ReactTabs.Tab;
let Tabs = ReactTabs.Tabs;
let TabList = ReactTabs.TabList;
let TabPanel = ReactTabs.TabPanel;


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
				<Tabs>

					<TabList>
						<Tab>Effect List</Tab>
						<Tab>Effect Params</Tab>
						<Tab>Filter Params</Tab>
						<Tab>Calibration Params</Tab>
					</TabList>

					<TabPanel title='Effect List'>
						<ComponentEffectList />
					</TabPanel>
					<TabPanel title='Effect Params'>
						<ComponentSliders key='effectParams' paramsPath={['effect','Rain']} />
					</TabPanel>
					<TabPanel title='Filter Params'>
						<ComponentSliders key='filterParams' paramsPath={['core','Filters']} />
					</TabPanel>
					<TabPanel title='Calibration'>
						<ComponentSliders key='calibrationParams' paramsPath={['core','Calibration']} />
					</TabPanel>

				</Tabs>
			</div>
		);
	}

});

module.exports = App;