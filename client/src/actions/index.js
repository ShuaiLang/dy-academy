import axios from 'axios';
import { FETCH_USER, FETCH_ALL_COURSES, FETCH_SINGLE_COURSE } from './types';

export const fetchUser = () => async (dispatch) => { // redux-thunk allows to receive an function and executes it.
	const res = await axios.get('/api/profile');
	console.log('action fetchUser: ', res.data);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllCourses = () => async (dispatch) => {
	const res = await axios.get('/api/course/all');
	dispatch({ type: FETCH_ALL_COURSES, payload: res.data });
};

export const fetchSingleCourse = (courseId) => async (dispatch) => {
	const res = await axios.get(`/api/course/${courseId}`);
	dispatch({ type: FETCH_SINGLE_COURSE, payload: res.data });
};
	
// relative path; use proxy in package.json (dev mode)
// But in production mode, there'll be no create-react server, nor proxy.
// It should go directly to the express server.

// export const handleToken = (token) => async dispatch => {
// 	const res = await axios.post('/api/stripe', token);
// 	dispatch({ type: FETCH_USER, payload: res.data});
// };