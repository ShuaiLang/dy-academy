import React  from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import styled from 'styled-components'

const NavWrapper = styled.div`
	> nav {
		border-radius: 0px;
	};
	> nav > .container {
		width: auto;
	}
`;

const Header = (props) => {
	console.log('rendering Header, auth: ', props.auth);
	return (
		<NavWrapper>
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
			  		<a href="/">DY Academy</a>
				</Navbar.Brand>
				<Navbar.Toggle />

			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="/courses"> Courses </NavItem>
					<NavItem eventKey={2} href="#"> Link </NavItem>
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another action</MenuItem>
						<MenuItem eventKey={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.3}>Separated link</MenuItem>
					</NavDropdown>
				</Nav>
					{props.auth ? (
							<Nav pullRight>
								<NavItem eventKey={1} href="/api/profile">
									<Button bsStyle="primary">{props.auth.local.email}</Button>
								</NavItem>
								<NavItem eventKey={2} href="/api/logout">
									<Button bsStyle="primary">登出</Button>
								</NavItem>
							</Nav>
						)
					 : (
							<Nav pullRight>
								<NavItem eventKey={1} href="/login">
									<Button bsStyle="primary">登录</Button>
								</NavItem>
								<NavItem eventKey={2} href="/signup">
									<Button bsStyle="primary">注册</Button>
								</NavItem>
							</Nav>
						)
					}
			</Navbar.Collapse>
		</Navbar>
		</NavWrapper>
	);
}

export default Header;