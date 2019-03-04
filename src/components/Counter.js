import React, { Component } from 'react';
import { connect } from 'react-redux';
import { counterInc, counterDec, deleteCounter } from '../actions/postActions';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Counter extends Component {

	constructor(props){
		super(props);

		this.onAddCounterInc = this.onAddCounterInc.bind(this);
		this.onAddCounterDec = this.onAddCounterDec.bind(this);
		this.onDeleteCounter = this.onDeleteCounter.bind(this);
	}

	onAddCounterInc(e){
		console.log('+', this.props);

		this.props.counterInc(this.props.id);
	}
	onAddCounterDec(e){
		console.log('-');
		if(this.props.count > 0){
			this.props.counterDec(this.props.id);	
		}else{
			console.log('its 0 already');
		}
	}

	onDeleteCounter(e){
		this.props.deleteCounter(this.props.id);
	}

	render() {
    	return (
    		<article className="counter">
	            <span>{ this.props.title }</span>
	            <div className="counter-controller">
	              <button className="button round-button" onClick={this.onAddCounterDec}><FontAwesomeIcon icon={faMinus} /></button>
	              <input value={this.props.count} type="text" readOnly/>
	              <button className="button round-button" onClick={this.onAddCounterInc}><FontAwesomeIcon icon={faPlus} /></button>
	            </div>

	            <button className="button" onClick={this.onDeleteCounter}><FontAwesomeIcon icon={faTrashAlt} /><span>Delete</span></button>
	        </article>
    	)
	}
}

Counter.propTypes = {
	counterInc : PropTypes.func.isRequired,
	counterDec : PropTypes.func.isRequired,
	deleteCounter : PropTypes.func.isRequired,
	title : PropTypes.string.isRequired,
	count : PropTypes.number.isRequired,
	id : PropTypes.string.isRequired,
};

const mapStateToProps = state => ({

})

export default connect(null,{ counterInc, counterDec, deleteCounter })(Counter);