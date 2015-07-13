import React from 'react';
import ReactTabs from 'react-tabs';

import ParamStore from '../stores/Params';
import EffectStore from '../stores/Effects';
import AppActions from '../actions/AppActions';
import connectToStores from '../utils/connectToStores';

import SlidersGroup from './SlidersGroup';
import EffectList from './EffectList';

let Tab = ReactTabs.Tab;
let Tabs = ReactTabs.Tabs;
let TabList = ReactTabs.TabList;
let TabPanel = ReactTabs.TabPanel;

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {

	const effectParams = ParamStore.getParamsByFamily('Effect');
	const filterParams = ParamStore.getParamsByFamily('Filter');
	const calibrationParams = ParamStore.getParamsByFamily('Calibration');

	const effects = EffectStore.get();

	return {effectParams, filterParams, calibrationParams, effects};
}

const stores = [ParamStore, EffectStore];
@connectToStores(stores, getState)
export default class App extends React.Component {

	render() {
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
						<EffectList items={this.props.effects} />
					</TabPanel>
					<TabPanel title='Effect Params'>
						<SlidersGroup items={this.props.effectParams} />
					</TabPanel>
					<TabPanel title='Filter Params'>
						<SlidersGroup items={this.props.filterParams} />
					</TabPanel>
					<TabPanel title='Calibration'>
						<SlidersGroup items={this.props.calibrationParams} />
					</TabPanel>

				</Tabs>
			</div>
		);
	}

}