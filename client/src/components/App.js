import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'; // so that compo able to call action creators
// import * as actions from '../actions';

import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

class App extends Component {

	render() {
		return (
			<div className="container">
				<a href="/signup">sign up</a>
				<a href="/login">log in</a>
				<BrowserRouter>
					<div>
						<Route exact path="/signup" component={Signup}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/profile" component={Profile}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default App;