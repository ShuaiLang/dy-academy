import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCourses } from '../../actions';
import { StyledCoursesBoardContainer } from './CourseStyles';
// import { Grid, Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';

class CoursesBoardContainer extends Component {
	componentDidMount() {
		this.props.fetchAllCourses();
	}

	renderCourses() {
		// console.log('render course props: ', this.props);
		return _.map(this.props.courses, course => 
				// 从主页'/'进来 或者从‘course’进来
				<Link key={course._id} to={`${this.props.location ? this.props.location.pathname : 'courses'}/${course._id}`}>
					<CourseCard key={course.Id} course = { course } />
				</Link>
		);
	}

	render() {
		// console.log('course board props: ', this.props);
		return (
			<div>
				<StyledCoursesBoardContainer>
					{ this.renderCourses() }
				</StyledCoursesBoardContainer>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return { courses: state.courses.allCourses }
}

export default connect(mapStateToProps, { fetchAllCourses })(CoursesBoardContainer);