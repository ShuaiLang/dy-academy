import React from 'react';

const SingleCourse = ({ course }) => {
	return (
		<div>
			<h1>{course.Name}</h1>
			<p>{course.Description}</p>
		</div>
	);
};

export default SingleCourse;
