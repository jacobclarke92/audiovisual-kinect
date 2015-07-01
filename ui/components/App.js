import React from 'react';
import ReactTabs from 'react-tabs';

import ParamStore from '../stores/ParamStore';
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
function getState(props) { // eslint-disable-line no-unused-vars

	const effectParams = ParamStore.getParamGroup(['effect']);

	return {
		effectParams
	};
}

const stores = [ParamStore];
@connectToStores(stores, getState)
export default class App extends React.Component {
	


	render() {
		return (
			<div className="app">
				<p>Hello</p>
				<Tabs>
					<TabList>
						{/*<Tab>Effect List</Tab>*/}
						<Tab>Effect Params</Tab>
						{/*<Tab>Filter Params</Tab>
						<Tab>Calibration Params</Tab>*/}
					</TabList>
					{/*}
					<TabPanel title='Effect List'>
						<ComponentEffectList />
					</TabPanel>*/}
					<TabPanel title='Effect Params'>
						<SlidersGroup items={this.props.effectParams} />
					</TabPanel>
					{/*<TabPanel title='Filter Params'>
						<SlidersGroup key='filterParams' paramsPath={['core','Filters']} />
					</TabPanel>
					<TabPanel title='Calibration'>
						<SlidersGroup key='calibrationParams' paramsPath={['core','Calibration']} />
					</TabPanel>*/}

				</Tabs>
			</div>
		);
	}

}