import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Counter from '../components/Counter';
import AddNewCounter from '../components/AddNewCounter';
import Overlay from '../components/Overlay';
import { connect } from 'react-redux';
import { fetchPosts, startNewPost } from '../actions/postActions';
import _ from 'lodash';

class Counters extends Component {

	constructor(props){
		super(props);
		this.state = {
			order:{}
		}
	}

	componentWillMount(){
		this.props.fetchPosts();
		this.onAddCounter = this.onAddCounter.bind(this);
	}

	onAddCounter(e){
		this.props.startNewPost(true);		
	}

	render() {
		let posts = this.props.posts;
		/*----------  If There is advanced filter.. well go filter  ----------*/
		
		if(!(Object.entries(this.props.advanced_filter).length === 0 && this.props.advanced_filter.constructor === Object)){
			posts = posts.filter((p)=>{
				if(this.props.advanced_filter.direction === 'less'){
					return p.count < Number(this.props.advanced_filter.range)
				}else{
					return p.count > Number(this.props.advanced_filter.range)
				}
			});
		}



		/*----------  If There is a search string filter by search  ----------*/
		let searchstring = this.props.searchstring.toLowerCase();
		let arr_order = this.props.order.split('|');

			posts = (this.props.searchstring !== '') ? posts.filter(v => v.title.toLowerCase().includes(searchstring)) : posts;
		
		/*----------  If There is a Order By Filter ... apply  ----------*/
		const filter = (arr_order.length) ? _.orderBy(posts,arr_order[0],arr_order[1]) : posts;
		const ctrs = filter.map(p=>{
			return <Counter key={p.id} title={p.title} count={p.count} id={p.id}/>;
		});

    	return (
			<div className="counters">
				{/* This shows if there is no counter in "DB" */}
				{ !this.props.posts.length && <div className="no-counters">Oops, no counters found in here... <a onClick={this.onAddCounter}>Elsa?...DO YOU WANT TO BUILD A COUNTER?</a></div>}
					<FlipMove>
	            		{ctrs}
	            		{/* This shows if there is no counter found on search filter */}
	            		{(posts.length === 0 && this.props.posts.length > 0) &&  <div className="none-found">mmm... we can not find any counter</div>}
	            	</FlipMove>
	            <AddNewCounter showIn={this.props.addPost}/>
	            <Overlay showIn={this.props.addPost}/>
          	</div>
    	)
	}
}

Counters.propTypes	= {
	fetchPosts: PropTypes.func.isRequired,
	startNewPost: PropTypes.func.isRequired,
	posts: PropTypes.array.isRequired,
	addPost:PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
	posts: state.post.counters,
	addPost: state.post.addingNewCounter,
	order: state.post.order,
	searchstring:state.post.searchstring,
	advanced_filter:state.post.advanced_filter
})

export default connect(mapStateToProps,{ fetchPosts,startNewPost })(Counters);