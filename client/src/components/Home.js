import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import CoursesBoardContainer from './CoursesBoardContainer/CoursesBoardContainer';

class Home extends Component {

	render() {
		return (
			<div>
				<HeaderContainer />
				Home
				<CoursesBoardContainer />
			</div>
		);
	}
}
export default Home;
// function mapStateToProps({auth}) {
// 	console.log('Home: ', auth);
// 	return { auth };
// }

// export default connect(mapStateToProps)(Home);
