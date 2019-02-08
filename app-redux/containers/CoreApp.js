import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewportActions from '../actions/ViewportActions';
import { rangeCalibrationParams, rangeDepthCalibrationParams } from '../selectors/calibrationParams';

@connect(state => ({
  viewport: state.viewport,
  calibration: rangeDepthCalibrationParams(state)
}))
export default class CoreApp extends Component {

  render() {
    return (
      <div>
      	<i>hi! {this.props.calibration.size}</i> {this.props.viewport.width} x {this.props.viewport.height}
      </div>
    );
  }

}