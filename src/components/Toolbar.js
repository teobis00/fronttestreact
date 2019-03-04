import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startNewPost } from '../actions/postActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Sigma from '../icons/Sigma.js';

class Toolbar extends Component {

	constructor(props){
		super(props);
		this.onAddCounter = this.onAddCounter.bind(this);
	}

	onAddCounter(e){
		this.props.startNewPost(true);		
	}

	render() {
    	return (
			<div className="toolbar">
	          <div className="wrapper-toolbar">
	            <div className="counter-sum">
	              <p><Sigma width={20} fill="#FFF" viewBox="0 0 20.89 24.225"/><span>Sum of all counters is:</span></p>
	              <input value={this.props.sum} readOnly/>
	            </div>
	            <button className="button" onClick={this.onAddCounter}><FontAwesomeIcon icon={faPlus} /><span>Add new counter</span></button>
	          </div>
	        </div>
    	)
	}
}

Toolbar.propTypes = {
	startNewPost : PropTypes.func.isRequired
};

const mapStatesToProps = state => ({
	sum: state.post.sum
});

export default connect(mapStatesToProps,{ startNewPost })(Toolbar);