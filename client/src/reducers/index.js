// this file would be imported by default.
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { courseReducer } from './coursesReducers';

export default combineReducers({
	auth: authReducer,
	courses: courseReducer,
});