import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewportActions from '../actions/ViewportActions';

@connect(state => ({
  viewport: state.get('viewport'),
}))

export class ViewportHandler extends Component {
	static
}