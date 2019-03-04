import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchCounter } from '../actions/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
	constructor(props){
		super(props);

		this.state = {
			search:''
		}

		this.onSearch = this.onSearch.bind(this);
	}

	onSearch(e){
		const {name,value} = e.target;
		this.setState({
			[name]:value
		});
		this.props.searchCounter(value)
	}

	render() {
    	return (
    		<header>
	          	<h1>Countershop</h1>
	          	<div className="search">
	          		<input maxLength="20" autoComplete="off" name="search" value={this.props.searchstring} onChange={this.onSearch} type="text" placeholder="Type to search"/>
	          		<FontAwesomeIcon icon={faSearch} />
	          	</div>	
	      	</header>
    	)
	}
}

Header.propTypes	= {
	searchCounter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	searchstring: state.post.searchstring
})

export default connect(mapStateToProps,{ searchCounter })(Header);