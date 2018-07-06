import React, { Component } from 'react';

import HeaderContainer from '../HeaderContainer/HeaderContainer';
import CoursesBoardContainer from '../CoursesBoardContainer/CoursesBoardContainer';

class AllCoursesContainer extends Component {

	render() {
		return (
			<div>
				<HeaderContainer />
				<CoursesBoardContainer />
			</div>
		);
	}
}

export default AllCoursesContainer;