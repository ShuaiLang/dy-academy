import React from 'react';
import { Link } from 'react-router-dom';

const SingleCourse = (props) => {
	const { course, isPurchased } = props;

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
	const { user, course, isInCart, addToCart, addToAnonymousCart } = props;
	if(user) {
		if(isInCart) {
			return (
				<button href = '/api/profile'>go to cart</button>
			);
		} else {
			return (
				<button onClick = {() => addToCart(course._id)}>Add to cart</button>
			);
		}	
	} else {
		return (
			<button onClick = {() => addToAnonymousCart(course._id)}>Add to cart</button>
		);
	}
	
}