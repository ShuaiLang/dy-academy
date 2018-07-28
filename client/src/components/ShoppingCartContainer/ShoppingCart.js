import React from 'react';
import { ShoppingCartWrapper, ShoppingCartHeader, ShoppingCartBody, ShoppingCartTitle, ShoppingCartList, ShoppingCartItem,
ShoppingCartImg, ShoppingCartItemName, ShoppingCartItemPrice, CheckoutBox, TotalPrice, TotalText, CheckoutButton } from './ShoppingCartStyles';
import { Link } from 'react-router-dom';
const ShoppingCart = (props) => {
	const { item } = props;
	return (
		<ShoppingCartWrapper>
			<ShoppingCartHeader>
				Shopping Cart
			</ShoppingCartHeader>
			<ShoppingCartBody>
				<ShoppingCartTitle>
					Checkout details
				</ShoppingCartTitle>
				<ShoppingCartList>
					<ShoppingCartItem>
						<ShoppingCartImg src={ item.ImgUrl }/>
						<ShoppingCartItemName>
							{ item.Name }
						</ShoppingCartItemName>
						<ShoppingCartItemPrice>
							{ item.Price }
						</ShoppingCartItemPrice>
					</ShoppingCartItem>
				</ShoppingCartList>
				<CheckoutBox>
					<div>
						<TotalPrice>
							{ item.Price }
						</TotalPrice>
						<TotalText>
							Total is: 
						</TotalText>
					</div>
					<a href={`/api/alipay/${item._id}`}>
						<CheckoutButton>
							Checkout Now
						</CheckoutButton>
					</a>
				</CheckoutBox>
			</ShoppingCartBody>
		</ShoppingCartWrapper>
	);
}

export default ShoppingCart;