import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'; // so that compo able to call action creators
import * as actions from '../actions';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import SingleCourseContainer from './SingleCourseContainer/SingleCourseContainer';
import AllCoursesContainer from './AllCoursesContainer/AllCoursesContainer';
import DirectCheckoutContainer from './ShoppingCart/DirectCheckoutContainer';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		console.log('App tempShoppingCart', this.props.tempShoppingCart);
		if(this.props.tempShoppingCart.length > 0) {
			this.props.updateUserShoppingCartFromAnonymous(this.props.tempShoppingCart);
		}
	}
	render() {
		return (
			<div className="">
				<BrowserRouter>
					<div>
						<Route exact path="/" component={Home}/>
						<Route exact path="/courses" component={AllCoursesContainer}/>
						<Route exact path="/courses/:courseId" component={SingleCourseContainer} />
						<Route exact path="/courses/checkout/:courseId" component={DirectCheckoutContainer} />
						<Route exact path="/signup" component={Signup}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/profile" component={Profile}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		tempShoppingCart: state.user.anonymousUser.tempShoppingCart
	};
}

export default connect(mapStateToProps, actions)(App);