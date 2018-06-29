// this file would be imported by default.
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import coursesReducer from './coursesReducer';

export default combineReducers({
	auth: authReducer,
	courses: coursesReducer
});