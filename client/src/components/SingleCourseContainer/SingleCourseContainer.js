import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse, cleanSingleCourse } from '../../actions';
import SingleCourse from './SingleCourse';

class SingleCourseContainer extends Component {
	componentDidMount() {
		this.props.fetchSingleCourse(this.props.match.params.courseId);
	}
	render() {
		if(this.props.course == null)
			return (
				<div>
					loading
				</div>
			);
		else {
			return (
				<SingleCourse course = {this.props.course}/>
			);
		}
	}
	componentWillUnmount() {
		this.props.cleanSingleCourse();
	}
}

function mapStateToProps(state) {
	return { course: state.courses.selectedCourse };
}

export default connect(mapStateToProps, { fetchSingleCourse, cleanSingleCourse })(SingleCourseContainer);