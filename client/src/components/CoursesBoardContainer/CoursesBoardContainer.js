import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCourses } from '../../actions';
import { CourseBoardContainer } from './CourseStyles';
import { Grid, Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';


class CoursesBoardContainer extends Component {
	componentDidMount() {
		this.props.fetchAllCourses();
	}

	renderCourses() {
		console.log('course board: ', this.props.courses);
		// if(!this.props.courses) return null;
		// console.log('course board: ', this.props.courses.courses);
		return _.map(this.props.courses, course => {
			return (
				<CourseCard course = { course } />
			);
		});
	}

	render() {
		return (
			<CourseBoardContainer>
				{ this.renderCourses() }
			</CourseBoardContainer>
		);
	}
}

function mapStateToProps(state) {
	return { courses: state.courses }
}

export default connect(mapStateToProps, { fetchAllCourses })(CoursesBoardContainer);