import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewportActions from '../actions/ViewportActions';

@connect(state => ({
  viewport: state.viewport
}))
export default class CoreApp extends Component {

  render() {
    return (
      <div>
      	<i>hi!</i> {this.props.viewport.get('width')} x {this.props.viewport.get('height')}
      </div>
    );
  }


  handleResize(e) {
    console.log(this.props, window.innerWidth, window.innerHeight);
	this.props.viewport(ViewportActions.viewportUpdate({
      width: window.innerWidth, 
      height: window.innerHeight
    }));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

}
