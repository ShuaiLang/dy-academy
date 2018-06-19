// this file would be imported by default.
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer
});