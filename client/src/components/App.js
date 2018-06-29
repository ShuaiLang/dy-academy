import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'; // so that compo able to call action creators
import * as actions from '../actions';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import CoursesBoardContainer from './CoursesBoardContainer/CoursesBoardContainer';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div className="">
				<BrowserRouter>
					<div>
						<Route exact path="/" component={Home}/>
						<Route exact path="/courses" component={CoursesBoardContainer}/>
						<Route exact path="/signup" component={Signup}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/profile" component={Profile}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);