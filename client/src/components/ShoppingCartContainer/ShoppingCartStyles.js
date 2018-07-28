import styled from 'styled-components';

export const ShoppingCartWrapper = styled.div`
	margin: 20px 100px;
`;

export const ShoppingCartHeader = styled.div`
	padding: 20px;
	width: 100%;
	position: relative;
	font-size: 24px;
`;

export const ShoppingCartBody = styled.div`
	width: 100%;
	min-height: 400px;
	padding: 15px 20px;
	box-shadow: 0px 8px 16px 7px rgba(7,17,27,.1);
	border-radius: 24px;
`;

export const ShoppingCartTitle = styled.p`
	display: inline-block;
	padding: 25px 0;
	font-size: 16px;
`;

export const ShoppingCartList = styled.div`
	width: 100%;
	height: 200px;
	> ul {
		list-style: none;
		width: 100%;
		padding-bottom: 30px;
	}
`;

export const ShoppingCartItem = styled.div`
	display: flex;
	height: 120px;
	padding: 20px 0;
	border-bottom: 1px solid #dddddd;
	background: #f3f5f7;
	> li {
		display: inline-block;
	}
`;

export const ShoppingCartImg = styled.img`
	width: 160px;
	height: 90px;
	margin-right: 20px;
	src: ${props => props.src};
    object-fit: cover;
`;

export const ShoppingCartItemName = styled.p`
	width: 450px;
	height: 90px;
	margin-right: 20px;
`;

export const ShoppingCartItemPrice = styled.p`
	color: red;
	width: 280px;
	font-size: 16px;
	margin-right: 20px;
`;

export const CheckoutBox = styled.div`
	margin-top: 30px;
	height: 100px;
	width: 100%;

`;
export const TotalPrice = styled.p`
	float: right;
	text-align: right;
	color: red;
	font-size: 24px;
`;

export const TotalText = styled.p`
	float: right;
`;

export const CheckoutButton = styled.button`
	padding: 0;
	float: right;
	clear: right;
    width: 140px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    border-radius: 12px;
    color: #fff;
    cursor: pointer;
    -weibkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
    color: #fff;
    background-color: #f20d0d;
    opacity: 1;
`;

