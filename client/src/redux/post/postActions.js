import * as api from "../../api";
import * as constants from './postConstants'

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({type: constants.START_LOADING})
		const { data } = await api.fetchPosts(page);
		dispatch({ type: constants.FETCH_ALL, payload: data })
		dispatch({type: constants.END_LOADING})
	} catch (error) {
		console.log(error.message);
	}
};
export const createPost = (post) => async (dispatch) => {
	try {
		dispatch({type: constants.START_LOADING})
		const { data } = await api.createPost(post);
		dispatch({ type: constants.CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: constants.UPDATE, payload: data });
	} catch (error) {}
};
export const deletePost = id => async dispatch => {
	try {
       await api.deletePost(id);
	   dispatch({type: constants.DELETE,payload: id});
	}
	catch (error) {
		console.log(error);

	}
}
export const likePost = id => async (dispatch) => {
	
	try {
		
		const { data } = await api.likePost(id);
		
		dispatch({ type: constants.UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
}
export const getPostBySearch = (searchQuery) => async dispatch => {
	console.log("Search Query",searchQuery)
	try {
		dispatch({type: constants.START_LOADING})
		const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
		
		dispatch({ type: constants.FETCH_BY_SEARCH, payload: data })
		dispatch({type: constants.END_LOADING})
	} catch (error) {
		console.log(error);
		
	}
}
export const getPost = (id) => async (dispatch) => {
	
	try {
		dispatch({type: constants.START_LOADING})
		const { data } = await api.fetchPost(id);
	
		dispatch({ type: constants.FETCH_POST, payload: data })
		dispatch({type: constants.END_LOADING})
	} catch (error) {
		console.log(error.message);
	}
};