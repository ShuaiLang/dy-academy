import axios from 'axios';
import { FETCH_USER, UPDATE_FROM_ANONYMOUS, FETCH_ALL_COURSES, FETCH_SINGLE_COURSE, CLEAN_SINGLE_COURSE, FETCH_PURCHASED_COURSES, 
ADD_TO_CART, ADD_TO_ANONYMOUS_CART } from './types';

export const fetchUser = () => async (dispatch) => { // redux-thunk allows to receive an function and executes it.
	const res = await axios.get('/api/profile'); // json object || false
	console.log('action fetchUser: ', res.data);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUserShoppingCartFromAnonymous = (items) => async (dispatch) => {
	const res = await axios.post('/api/user/update_from_anonymous', {items: items});
	dispatch({ type: UPDATE_FROM_ANONYMOUS, payload: res.data });
}

export const fetchAllCourses = () => async (dispatch) => {
	const res = await axios.get('/api/course/all');
	dispatch({ type: FETCH_ALL_COURSES, payload: res.data });
};

export const fetchSingleCourse = (courseId) => async (dispatch) => {
	const res = await axios.get(`/api/course/${courseId}`);
	dispatch({ type: FETCH_SINGLE_COURSE, payload: res.data });
};

export const cleanSingleCourse = () => (dispatch) => {
	dispatch({ type: CLEAN_SINGLE_COURSE, payload: null});
};

export const fetchPurchasedCourses = () => async (dispatch) => {
	const res = await axios.get('/api/user/purchased');
	dispatch({ type: FETCH_PURCHASED_COURSES, payload: res.data });
};

export const addToCart = (courseId) => async (dispatch) => {
	const res = await axios.get(`/api/user/addtocart/${courseId}`);
	if(res) {
		dispatch({ type: ADD_TO_CART, payload: res.data });
	} else {
		console.log('fail to add to cart');
	}
};

export const addToAnonymousCart = (courseId) => (dispatch) => {
	dispatch({ type: ADD_TO_ANONYMOUS_CART, payload: courseId });
};

	
// relative path; use proxy in package.json (dev mode)
// But in production mode, there'll be no create-react server, nor proxy.
// It should go directly to the express server.

// export const handleToken = (token) => async dispatch => {
// 	const res = await axios.post('/api/stripe', token);
// 	dispatch({ type: FETCH_USER, payload: res.data});
// };