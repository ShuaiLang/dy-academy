import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import { fetchSingleCourse, cleanSingleCourse, fetchPurchasedCourses, addToCart } from '../../actions';
import SingleCourse from './SingleCourse';

class SingleCourseContainer extends Component {
	componentDidMount() {
		this.props.fetchSingleCourse(this.props.match.params.courseId);
	}

	verify(ids, id) {
		if(ids) {
			console.log('got purchased data: ', ids);
			for(let i of ids) {
				if(i === id)
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
				<div>
					<HeaderContainer />
					<SingleCourse 
						course = {this.props.course} 
						isPurchased = {this.verify(this.props.purchasedCourses, this.props.course._id)}
						isInCart = {this.verify(this.props.shoppingCart, this.props.course._id)}
						user = {this.props.user}
						addToCart = {this.props.addToCart}
					/>
				</div>
			);
		}
	}
	componentWillUnmount() {
		console.log('singlecourse unmounting.');
		this.props.cleanSingleCourse();
	}
}

function mapStateToProps(state) {
	return { 
		user: state.user.loggedInUser,
		course: state.courses.selectedCourse,
		purchasedCourses: state.user.loggedInUser ? state.user.loggedInUser.purchasedCourses : null,
		shoppingCart: state.user.loggedInUser ? state.user.loggedInUser.shoppingCart : null
	};
}

export default connect(mapStateToProps, { 
	fetchSingleCourse, 
	cleanSingleCourse, 
	fetchPurchasedCourses,
	addToCart
})(SingleCourseContainer);