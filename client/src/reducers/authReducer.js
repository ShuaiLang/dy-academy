import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	console.log(action);
	switch (action.type) {
		case FETCH_USER: 
			return action.payload || false; // payload will be an empty str if not logged in, no data back from server.
		default: 
			return state;
	}
}