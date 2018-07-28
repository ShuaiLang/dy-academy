import React from 'react';
import { Link } from 'react-router-dom';

const SingleCourse = (props) => {
	const { course, isPurchased, isInCart, addToCart, user } = props;

	return (
		<div>
			<h1>{ course.Name }</h1>
			<p>{ course.Description }</p>
			{ 
				isPurchased ? <Link to={`/watch/${course.Name}`}>Watch</Link>
				:   <div>
						<a href = {`/courses/checkout/${course._id}`}>
							<button>Purchase Right Now</button>
						</a>
						{ renderAddToCartButton(props) }
					</div>
			}
		</div>
	);
};

export default SingleCourse;

function renderAddToCartButton (props) {
	const { course, isInCart, addToCart, user } = props;

	if(isInCart) {
		return (
			<button href = '/api/profile'>go to cart</button>
		);
	} else {
		return (
			<button onClick = {() => addToCart(user, course._id)}>Add to cart</button>
		);
	}
}