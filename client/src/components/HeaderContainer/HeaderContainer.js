import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from './Header/Header';
// import { Button } from 'react-bootstrap';

class HeaderContainer extends Component {
	getUserStatus() {
		switch (this.props.user) {
			case false:
				return false;
			default:
				return this.props.user;
		}
	}
	render() {
		if(this.getUserStatus() != null) {
			return (
				<Header user={ this.getUserStatus() }/>
			);
		}
		return null;
	}
}
function mapStateToProps(state) {
	return { user: state.user.loggedInUser };
}
export default connect(mapStateToProps)(HeaderContainer);