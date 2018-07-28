import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse, cleanSingleCourse } from '../../actions';
import ShoppingCart from './ShoppingCart';

class CheckoutContainer extends Component {

	componentDidMount() {
		// grab course id from match.params
		this.props.fetchSingleCourse(this.props.match.params.courseId);
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
				<ShoppingCart item = { this.props.course } />
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
})(CheckoutContainer);