import { FETCH_ALL_COURSES, FETCH_SINGLE_COURSE } from '../actions/types';

export const allCourseReducer = (state = null, action) => {
	console.log('allCoursesReducer got an action: ', action);
	switch (action.type) {
		case FETCH_ALL_COURSES: 
			return action.payload || false; // payload will be an empty str if not logged in, no data back from server.
		default: 
			return state;
	}
};

export const singleCourseReducer = (state = null, action) => {
	console.log('singleCourseReducer got an action: ', action);
	switch(action.type) {
		case FETCH_SINGLE_COURSE:
			return action.payload || false;
		default:
			return state;
	}
}