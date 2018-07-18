import { FETCH_USER, FETCH_PURCHASED_COURSES } from '../actions/types';

export const authReducer = (state = {}, action) => {
	
	switch (action.type) {
		case FETCH_USER: 
			console.log('authReducer got FETCH_USER: ', action);
			return {...state, 
				loggedIn: action.payload.local || false
			}; // payload will be an empty str if not logged in, no data back from server.
		case FETCH_PURCHASED_COURSES:
			console.log('authReducer got FETCH_PURCHASED_COURSES: ', action);
			return {...state,
				purchasedCourses: action.payload
			}
		default: 
			return state;
	}
}

// export const purchasedReducer = (state = null, action) => {
	
// 	switch (action.type) {
// 		case FETCH_PURCHASED_COURSES:
// 			console.log('purchasedReducer got FETCH_PURCHASED_COURSES: ', action);
// 			return action.payload || false;
// 		default:
// 			return state;
// 	}
// }