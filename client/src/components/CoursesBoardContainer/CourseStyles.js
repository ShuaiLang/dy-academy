import styled from 'styled-components';

export const CourseBoardContainer = styled.div`
	width: 1152px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding: 30px 0 40px;
`;

export const CourseCardContainer = styled.div`
	float: left;
	width: 216px;
	height: 252px;
    margin-right: 14px;
	position: relative;
	transition: .3s all linear;
	border-radius: 5px;
	margin-bottom: 12px;
`;

export const CourseCardTop = styled.div`
	overflow: hidden;
	background-size: cover;
	position: relative;
	width: 216px;
	height: 120px;
	border-radius: 5px;
	transition: all .3s
`;

export const CourseCardBanner = styled.img`
	src: ${props => props.src};
    object-fit: cover;
	width: 100%;
	height: 100%;
	border-radius: 5px;
`;

export const CourseCardTags = styled.div`
	position: absolute;
	bottom: 6px;
	left: 8px;
	font-size: 12px;
	line-height: 16px;
	color: #fff;
	background-size: cover;
	> label {
		display: inline-block;
		background: rgba(211, 220, 229, 0.4);
		border-radius: 10px;
		padding: 5px 8px;
	}
`;

export const CourseCardContent = styled.div`
	padding: 10px 5px;
`;

export const CourseCardName = styled.h3`
    margin-top: 0px;
    font-size: 16px;
    color: #07111B;
    line-height: 24px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 46px;
    transition: all .3s;

`;

export const CourseCardBottom = styled.div`
	
`;

// export const CourseCardTags = styled.div`
// 	font-size: 12px;
//     color: #878c90;
//     line-height: 24px;
//     margin-top: 8px;
//     font-weight: 400;
//     > span {
//     	display: inline-block;
//     	margin-right: 12px;
//     }
// `;

export const CourseCardStars = styled.span`
	font-size: 12px;
	color: rgba(255,153,0,.4);
	> span {
		color: #eab802;
		content: "\e900";
	}
`;

export const CourseCardPrice = styled.div`
	font-size: 12px;
	color: black;
	line-height: 20px;
	margin-top: 5px;
`;