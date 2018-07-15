import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPurchasedCourses, cleanSingleCourse } from '../../actions';

class SingleCourse extends Component {
	componentDidMount() {
		this.props.fetchPurchasedCourses();
	}

	// componentWillUnmount() {
	// 	this.props.cleanSingleCourse();
	// }

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
		const { course } = this.props;
		return (
			<div>
				<h1>{ course.Name }</h1>
				<p>{ course.Description }</p>
				{ this.verifyPurchase(this.props.purchased) ? <p>purchased</p> : <p>not purchased</p> }
			</div>
		);
	}
};

function mapStateToProps(state) {
	return { purchased: state.auth.purchasedCourses };
}

export default connect(mapStateToProps, { fetchPurchasedCourses, cleanSingleCourse })(SingleCourse);
