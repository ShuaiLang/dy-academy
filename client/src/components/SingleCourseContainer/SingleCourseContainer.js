import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse } from '../../actions';
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
}

function mapStateToProps(state) {
	return { course: state.selectedCourse };
}

export default connect(mapStateToProps, { fetchSingleCourse })(SingleCourseContainer);