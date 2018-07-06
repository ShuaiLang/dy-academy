import React, { Component } from 'react';
import { CourseCardContainer, CourseCardTop, CourseCardBanner, CourseCardTags, 
CourseCardContent, CourseCardName, CourseCardBottom, CourseCardStars,
CourseCardPrice } from './CourseStyles';

const renderTags = (tags) => {
	return tags.map(tag => {
		return (
			<label key={tag}> { tag } </label>
		);
	});
}

const renderStars = (stars) => {
	const list = [];
	for(let i = 0; i < stars; i++) {
		list.push((<span key={i}></span>));
	}
	return list;
}

const CourseCard = (props) => {
	return (
		<CourseCardContainer>
			<CourseCardTop>
				<CourseCardBanner  src={ props.course.ImgUrl } />
				<CourseCardTags>
					{ renderTags(props.course.Tags) }
				</CourseCardTags>
			</CourseCardTop>
			<CourseCardContent>
				<CourseCardName>
					{ props.course.Name }
				</CourseCardName>
				<CourseCardBottom>
					<CourseCardPrice>
						{ props.course.Price }
					</CourseCardPrice>
					<CourseCardStars>
						{ renderStars(props.course.Stars) }
					</CourseCardStars>
				</CourseCardBottom>
			</CourseCardContent>
		</CourseCardContainer>
	);
}

export default CourseCard;