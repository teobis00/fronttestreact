import { FETCH_POSTS, START_NEW_POST, DELETE_COUNTER, CHANGE_COUNTERS_ORDER, SEARCH_COUNTER,ADVANCED_FILTER } from '../actions/types';
import axios from 'axios';

const returnSum = (posts)=>{
	return posts.reduce((acc,post)=> acc + post.count,0);
}

export const fetchPosts = () => dispatch => { // actually called from cp

		axios.get('/api/v1/counters',{},{
		  headers: {'content-type':'application/json'}
		}).then(posts=>{
			returnSum(posts.data);
			dispatch({
				type: FETCH_POSTS,
				payload : {counters:posts.data,sum:returnSum(posts.data)}
			})
		});
}

export const startNewPost = (stateData) => dispatch => { // actually called from cp
		console.log('show add counter component');
		dispatch({
			type:START_NEW_POST,
			payload:stateData
		})	
}

export const saveNewPost = (stateData) => dispatch => { // actually called from cp
		
		axios.post('/api/v1/counter',{title: stateData.title},{
		  headers: {'content-type':'application/json'}
		}).then(posts=>{
			dispatch({
				type: FETCH_POSTS,
				payload : {counters:posts.data,sum:returnSum(posts.data)}
			})
		});	
}

export const counterInc = (counterId) => dispatch => { // actually called from cp
		console.log('CID', counterId);
		axios.post('/api/v1/counter/inc',{id: counterId},{
		  headers: {'content-type':'application/json'}
		}).then(posts=>{
			dispatch({
				type: FETCH_POSTS,
				payload : {counters:posts.data,sum:returnSum(posts.data)}
			})
		});

}

export const counterDec = (counterId) => dispatch => { // actually called from cp
		console.log('CID', counterId);
		axios.post('/api/v1/counter/dec',{id: counterId},{
		  headers: {'content-type':'application/json'}
		}).then(posts=>{
			dispatch({
				type: FETCH_POSTS,
				payload : {counters:posts.data,sum:returnSum(posts.data)}
			})
		});

}

export const deleteCounter = (counterId) => dispatch => { // actually called from cp
		console.log('DELETE', counterId);
		axios.delete('/api/v1/counter',{data:{id: counterId}},{
		  headers: {'content-type':'application/json'}
		}).then(posts=>{
			dispatch({
				type: FETCH_POSTS,
				payload : {counters:posts.data,sum:returnSum(posts.data)}
			})
		});

}

export const changeCountersOrder = (order) => dispatch => { // actually called from cp
		console.log('NEW ORDER',order);
		dispatch({
			type:CHANGE_COUNTERS_ORDER,
			payload:order
		})
}

export const searchCounter = (searchstring) => dispatch => { // actually called from cp
		console.log('SEARCHIN',searchstring);
		dispatch({
			type:SEARCH_COUNTER,
			payload:searchstring
		})
}

export const advancedFilter = (params) => dispatch => { // actually called from cp
		console.log('FILTERING',params);
		dispatch({
			type:ADVANCED_FILTER,
			payload:params
		})
}