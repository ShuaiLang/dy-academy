import { FETCH_USER, FETCH_PURCHASED_COURSES, ADD_TO_CART } from '../actions/types';

export const userReducer = (state = {}, action) => {
	
	switch (action.type) {
		case FETCH_USER:
			console.log('userReducer got FETCH_USER: ', action);
			return {...state, 
				loggedInUser: action.payload
			}; // payload will be an empty str if not logged in, no data back from server.
		case FETCH_PURCHASED_COURSES:
			console.log('userReducer got FETCH_PURCHASED_COURSES: ', action);
			return {...state,
				loggedInUser: {...state.loggedInUser,
					purchasedCourses: action.payload
				}
			};
		case ADD_TO_CART:
			console.log('userReducer got ADD_TO_CART: ', action);
			return {...state,
				loggedInUser: {...state.loggedInUser,
					shoppingCart: action.payload
				}
				
			};
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