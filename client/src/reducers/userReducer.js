import { FETCH_USER, UPDATE_FROM_ANONYMOUS, FETCH_PURCHASED_COURSES, ADD_TO_CART, ADD_TO_ANONYMOUS_CART } from '../actions/types';

const initialState = {
	anonymousUser: {
		tempShoppingCart: []
	}
};

export const userReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case FETCH_USER:
			console.log('userReducer got FETCH_USER: ', action);
			// var userProfile = null;
			// if(action.payload) { // user is now logged in

			// 	// update shoppingCart if any in tempShoppingCart
			// 	userProfile = action.payload;
			// 	if(state.anonymousUser.tempShoppingCart.length > 0) {
			// 		userProfile.shoppingCart = Array.from(new Set([...userProfile.shoppingCart, ...state.anonymousUser.tempShoppingCart]));
			// 	}
			// 	return {...state,
			// 		loggedInUser: userProfile,
			// 		anonymousUser: initialState.anonymousUser
			// 	};
			// }
			// else { // user is not logged in 
			// 	return {...state,
			// 		loggedInUser: action.payload,
			// 	};
			// }
			return {...state, 
				loggedInUser: action.payload, // merge temp cart (if any) with shopping cart
				anonymousUser: action.payload ? initialState.anonymousUser : state.anonymousUser // clear temp cart after login
			};
			
		case UPDATE_FROM_ANONYMOUS:
			if(action.payload) {
				return {...state,
					loggedInUser: {...state.loggedInUser,
						shoppingCart: action.payload
					}
				}
			} else {
				return state;
			}
			

		case FETCH_PURCHASED_COURSES:
			// UPDATE PURCHASED COURSES STATE
			console.log('userReducer got FETCH_PURCHASED_COURSES: ', action);
			return {...state,
				loggedInUser: {...state.loggedInUser,
					purchasedCourses: action.payload
				}
			};
		case ADD_TO_CART:
			// UPDATE SHOPPING CART STATE
			console.log('userReducer got ADD_TO_CART: ', action);
			return {...state,
				loggedInUser: {...state.loggedInUser,
					shoppingCart: action.payload
				}
				
			};
		case ADD_TO_ANONYMOUS_CART:
			console.log('userReducer got ADD_TO_ANONYMOUS_CART: ', action);
			return {...state,
				anonymousUser: {...state.anonymousUser,
					tempShoppingCart: Array.from(new Set([...state.anonymousUser.tempShoppingCart, action.payload]))
				}

			}
		default: 
			return state;
	}
};