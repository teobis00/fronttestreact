import { FETCH_POSTS, START_NEW_POST, COUNTER_INC, COUNTER_DEC, DELETE_COUNTER, CHANGE_COUNTERS_ORDER, SEARCH_COUNTER, ADVANCED_FILTER } from '../actions/types';

const initialState = {
	counters:[],
	sum:0,
	counter: {},
	addingNewCounter:false,
	order:'',
	searchstring:'',
	advanced_filter:{}
}

export default function(state = initialState, action){
	switch(action.type){
		/* Populate Counters */
		case FETCH_POSTS:
			console.log('reducer');
			return {
				...state,
				counters: action.payload.counters,
				sum:action.payload.sum
			}
		/* Start Add New Counter */
		case START_NEW_POST:
			return {
				...state,
				addingNewCounter: action.payload
			}
		/* Change Order */
		case CHANGE_COUNTERS_ORDER:
			return {
				...state,
				order: action.payload
			}
		/* Change Order */
		case SEARCH_COUNTER:
			return {
				...state,
				searchstring: action.payload
			}
		/* Change Order */
		case ADVANCED_FILTER:
			return {
				...state,
				advanced_filter: action.payload
			}

		default:
		return state;
	}
}