import { FETCH_ALL_COURSES } from '../actions/types';
export default function(state = null, action) {
	console.log('courses reducer got action: ', action);
	switch (action.type) {
		case FETCH_ALL_COURSES: 
			return action.payload || false; // payload will be an empty str if not logged in, no data back from server.
		default: 
			return state;
	}
}