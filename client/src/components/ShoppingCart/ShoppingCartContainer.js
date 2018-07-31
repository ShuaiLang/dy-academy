import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCourse, cleanSingleCourse } from '../../actions';

class ShoppingCartContainer extends Component {
	componentDidMount() {
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
}

function mapStateToProps(state) {
	return {
		course: state.courses.selectedCourse
	};
}

export default connect(mapStateToProps, {
	fetchSingleCourse,
	cleanSingleCourse
})(ShoppingCartContainer);