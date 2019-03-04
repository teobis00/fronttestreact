import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCountersOrder, searchCounter, advancedFilter } from '../actions/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimesCircle,faTimes } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {
			order:'',
			openFilterOptions:false,
			frange:'',
			irange:0
		}

		this.onOrderChange = this.onOrderChange.bind(this);
		this.onResetSearch = this.onResetSearch.bind(this);
		this.onShowFilterOptions = this.onShowFilterOptions.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onApplyMoreFilters = this.onApplyMoreFilters.bind(this);
		this.onResetFilter = this.onResetFilter.bind(this);
		this.capital = this.capital.bind(this);
	}

	capital(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	onShowFilterOptions(){
		let openNew = !this.state.openFilterOptions;
		console.log('openNew',openNew);
		this.setState({
			openFilterOptions: openNew
		});
	}

	onApplyMoreFilters(){
		let params = {
						direction:this.state.frange,
						range:this.state.irange
					 }
		if(this.state.frange === '' || this.state.irange === '' || isNaN(this.state.irange)){
			return false;
		}

		this.props.advancedFilter(params);
	}

	onResetFilter(){
		this.props.advancedFilter({});
		this.setState({
			openFilterOptions: false,
			irange:0,
			frange:''
		});
	}

	onResetSearch(){
		this.props.searchCounter('');
	}

	onFilterChange(e){
		const {name,value,checked} = e.target;
		console.log(name,value);
		this.setState({
			[name]:value
		});
	}

	onOrderChange(e){
		const {name,value} = e.target;
		this.setState({
			[name]:value
		});
		console.log('CHANGIN IN NAV',value);
		this.props.changeCountersOrder(value);
	}

	render() {
		const initialSearchClassShip = ['showing-results-search','__alt_ship','show'];
		const filterClassSearchShip  = (this.props.searchstring !=='') ? initialSearchClassShip : initialSearchClassShip.filter(v => v !=='show');


		const initialFilterClassShip = ['showing-results-search','__alt_ship','show'];
		const filterFilterSearchShip  = (!_.isEmpty(this.props.advanced_filter)) ? initialFilterClassShip : initialFilterClassShip.filter(v => v !=='show');

		const initialClassNav = ['filters','more-filters'];
		const filterClassNav  = (this.state.openFilterOptions) ? initialClassNav : initialClassNav.filter(v => v !=='more-filters');

		const initialClassButton = ['button','convert-to-close'];
		const filterClassButton  = (this.state.openFilterOptions) ? initialClassButton : initialClassButton.filter(v => v !=='convert-to-close');

    	return (
    		<nav className={filterClassNav.join(' ')}>
	          <ul>
	            <li><label>Order by: </label>
	            	<div className="select">
	            		<select name="order" onChange={this.onOrderChange} value={this.state.order}>
	            			<option value="">-- select order --</option>
	            			<option value="count|asc">Counter Asc</option>
	            			<option value="count|desc">Counter Desc</option>
	            			<option value="title|asc">Title Asc</option>
	            			<option value="title|desc">Title Desc</option>
	            		</select>
	            	</div>
	            </li>
	            <li>
	            	 <label className={filterClassSearchShip.join(' ')}>
		            	Showing counters with <span>"{this.props.searchstring}"</span> on the title
		            	<button onClick={this.onResetSearch}>
		            		<FontAwesomeIcon icon={faTimesCircle} />
		            	</button>
		            </label>
		            <label className={filterFilterSearchShip.join(' ')}>
		            	Showing counters {this.props.advanced_filter.direction} than {this.props.advanced_filter.range}
		            	<button onClick={this.onResetFilter}>
		            		<FontAwesomeIcon icon={faTimesCircle} />
		            	</button>
		            </label>
	            </li>
	            <li><button className={filterClassButton.join(' ')} onClick={this.onShowFilterOptions}><FontAwesomeIcon icon={faTimes} /><FontAwesomeIcon icon={faFilter} /><span>More filters</span></button></li>
	          </ul>
	          <ul className="second-line">
	          	<li>
	          		<span>Show counters when they are:</span>
	          		<div className="controls">
	          			<label><input type="radio" value="greater" name="frange" onChange={this.onFilterChange} checked={this.state.frange === "greater"}/> <span>Greater</span></label>
	          			<label><input type="radio" value="less" name="frange" onChange={this.onFilterChange} checked={this.state.frange === "less"}/> <span>Less</span></label>
	          		</div>
	          		<p>Than</p>
	          		<input type="text" name="irange" onChange={this.onFilterChange} value={this.state.irange}/>

	          		<button className="button" onClick={this.onApplyMoreFilters}>
		            	<span>Apply filters</span>
		            </button>
	          	</li>
	          </ul>
	        </nav>
    	)
	}
}

Nav.propTypes	= {
	changeCountersOrder: PropTypes.func.isRequired,
	searchCounter: PropTypes.func.isRequired,
	advancedFilter: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	searchstring: state.post.searchstring,
	advanced_filter:state.post.advanced_filter
})

export default connect(mapStateToProps,{ changeCountersOrder, searchCounter, advancedFilter })(Nav);