// this file would be imported by default.
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { allCourseReducer, singleCourseReducer } from './coursesReducers';

export default combineReducers({
	auth: authReducer,
	courses: allCourseReducer,
	selectedCourse: singleCourseReducer
});