import React from 'react';
import { Link } from 'react-router-dom';

const SingleCourse = (props) => {
	const { course } = props;
	const { purchased } = props;

	return (
		<div>
			<h1>{ course.Name }</h1>
			<p>{ course.Description }</p>
			{ 
				purchased ? 
					<Link to={`/watch/${course.Name}`}>Watch</Link>
					: 
					<a href={`/api/alipay/${course._id}`}>Purchase Right Now</a>
			}
		</div>
	);
};

export default SingleCourse;