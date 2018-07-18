import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse, cleanSingleCourse, fetchPurchasedCourses } from '../../actions';
import SingleCourse from './SingleCourse';

class SingleCourseContainer extends Component {
	componentDidMount() {
		this.props.fetchSingleCourse(this.props.match.params.courseId);
		this.props.fetchPurchasedCourses();
	}

	verifyPurchase(purchased) {
		if(this.props.purchased) {
			console.log('got purchased data: ', this.props.purchased);
			for(let i of this.props.purchased) {
				if(i === this.props.course._id)
					return true;
			}
		}
		return false;
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
				<SingleCourse 
					course = {this.props.course} 
					purchased = {this.verifyPurchase(this.props.purchased)}
				/>
			);
		}
	}
	componentWillUnmount() {
		this.props.cleanSingleCourse();
	}
}

function mapStateToProps(state) {
	return { 
		course: state.courses.selectedCourse,
		purchased: state.auth.purchasedCourses 
	};
}

export default connect(mapStateToProps, { 
	fetchSingleCourse, 
	cleanSingleCourse, 
	fetchPurchasedCourses 
})(SingleCourseContainer);