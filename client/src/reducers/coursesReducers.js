import { FETCH_ALL_COURSES, FETCH_SINGLE_COURSE, CLEAN_SINGLE_COURSE, ADD_TO_CART } from '../actions/types';

export const courseReducer = (state = {}, action) => {
	
	switch (action.type) {
		case FETCH_ALL_COURSES:
			console.log('courseReducer got FETCH_ALL_COURSES: ', action);
			return {...state, 
				allCourses : action.payload || false
			};	 // payload will be an empty str if not logged in, no data back from server.
		case FETCH_SINGLE_COURSE:
			console.log('courseReducer got FETCH_SINGLE_COURSE: ', action);
			return {...state, 
				selectedCourse : action.payload
			};
		case CLEAN_SINGLE_COURSE:
			console.log('courseReducer got CLEAN_SINGLE_COURSE: ', action);
			return {...state, 
				selectedCourse: null
			};
		default: 
			return state;
	}
};

// export const singleCourseReducer = (state = null, action) => {
// 	console.log('singleCourseReducer got an action: ', action);
// 	switch(action.type) {
// 		case FETCH_SINGLE_COURSE:
// 			return action.payload || false;
// 		default:
// 			return state;
// 	}
// }