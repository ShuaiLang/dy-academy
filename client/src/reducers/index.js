// this file would be imported by default.
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { courseReducer } from './coursesReducers';

export default combineReducers({
	user: userReducer,
	courses: courseReducer,
});