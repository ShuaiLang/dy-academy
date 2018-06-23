import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderContainer from './HeaderContainer/HeaderContainer';

class Home extends Component {

	render() {
		return (
			<HeaderContainer />
		);
	}
}
export default Home;
// function mapStateToProps({auth}) {
// 	console.log('Home: ', auth);
// 	return { auth };
// }

// export default connect(mapStateToProps)(Home);
