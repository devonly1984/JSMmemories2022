import * as constants from './postConstants';

export const postReducer = (state ={isLoading: true, posts: []}, action) => {
	switch (action.type) {
		case constants.START_LOADING:
			return {
				...state, isLoading: true
			}
		case constants.END_LOADING:
			return {
				...state, isLoading: false
			}
		case constants.FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberofPage: action.payload.numberofPage
			};
		case constants.CREATE:
			return {...state, posts: action.payload	}
		case constants.UPDATE:
		
			return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
		case constants.DELETE:
			return{...state,posts: state.posts.filter(p => p._id !== action.payload)}
	
		case constants.FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };
		case constants.FETCH_POST:
			return {...state,post: action.payload}
		default:
			return state;
	}
};
