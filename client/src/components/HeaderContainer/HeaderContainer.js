import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from './Header/Header';
// import { Button } from 'react-bootstrap';

class HeaderContainer extends Component {
	getUserStatus() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return false;
			default:
				return this.props.auth;
		}
	}
	render() {
		if(this.getUserStatus() != null) {
			return (
				<Header auth={ this.getUserStatus() }/>
			);
		}
		return null;
	}
}
function mapStateToProps({ auth }) {
	return { auth: auth.loggedIn };
}
export default connect(mapStateToProps)(HeaderContainer);