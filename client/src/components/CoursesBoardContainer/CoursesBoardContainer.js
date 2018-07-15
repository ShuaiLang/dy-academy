import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { fetchAllCourses } from '../../actions';
import { StyledCoursesBoardContainer } from './CourseStyles';
import { Grid, Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';

class CoursesBoardContainer extends Component {
	componentDidMount() {
		this.props.fetchAllCourses();
	}

	renderCourses() {
		console.log('render course props: ', this.props);
		return _.map(this.props.courses, course => {
			return (
				<Link key={course.Id} to={`${this.props.location ? this.props.location.pathname : 'courses'}/${course._id}`}>
					<CourseCard course = { course } />
				</Link>
			);
		});
	}

	render() {
		console.log('course board props: ', this.props);
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