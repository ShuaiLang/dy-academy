import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse, cleanSingleCourse } from '../../actions';
import DirectCheckout from './DirectCheckout';

class DirectCheckoutContainer extends Component {

	componentDidMount() {
		// grab course id from match.params
		this.props.fetchSingleCourse(this.props.match.params.courseId);
	}

	componentWillUnmount() {
		console.log('singlecourse unmounting.');
		this.props.cleanSingleCourse();
	}
	
	render() {
		if(this.props.course == null)
			return (
				<div>
					loading
				</div>
			);
		else
			return (
				<DirectCheckout item = { this.props.course } />
			);
	}

	
	// checkout from single course page:

}
function mapStateToProps(state) {
	return {
		course: state.courses.selectedCourse
	};
}
export default connect(mapStateToProps, {
	fetchSingleCourse, 
	cleanSingleCourse 
})(DirectCheckoutContainer);