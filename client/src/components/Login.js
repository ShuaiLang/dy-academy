import React, { Component } from 'react';
// import { Form, FormGroup, Col, FormControl ,ControlLabel, Checkbox, Button } from 'react-bootstrap';
//import styled from 'styled-components';


class Login extends Component {
	render() {
		return (
			<div>
				<h1><span className="fa fa-sign-in"></span> Login</h1>

				<div className="alert alert-danger"></div>

				<form action="/api/login" method="post">
					<div className="form-group">
					    <label>Email</label>
					    <input type="text" className="form-control" name="email"/>
					</div>
					<div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" name="password"/>
					</div>

					<button type="submit" className="btn btn-warning btn-lg">Log in</button>
				</form>

				<hr/>

				<p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a>.</p>
			</div>
			
		);
	}
}

export default Login;

// <div>
// 				<h1><span class="fa fa-sign-in"></span> Login</h1>

// 				<div class="alert alert-danger"></div>

// 				<form action="/api/login" method="post">
// 					<div class="form-group">
// 					    <label>Email</label>
// 					    <input type="text" class="form-control" name="email"/>
// 					</div>
// 					<div class="form-group">
// 					    <label>Password</label>
// 					    <input type="password" class="form-control" name="password"/>
// 					</div>

// 					<button type="submit" class="btn btn-warning btn-lg">Log in</button>
// 				</form>

// 				<hr/>

// 				<p>Need an account? <a href="/signup">Signup</a></p>
//                 <p>Or go <a href="/">home</a>.</p>
// 			</div>

// <Form horizontal>
// 			  <FormGroup controlId="formHorizontalEmail">
// 			    <Col componentClass={ControlLabel} sm={2}>
// 			      Email
// 			    </Col>
// 			    <Col sm={10}>
// 			      <FormControl type="email" placeholder="Email" />
// 			    </Col>
// 			  </FormGroup>

// 			  <FormGroup controlId="formHorizontalPassword">
// 			    <Col componentClass={ControlLabel} sm={2}>
// 			      Password
// 			    </Col>
// 			    <Col sm={10}>
// 			      <FormControl type="password" placeholder="Password" />
// 			    </Col>
// 			  </FormGroup>

// 			  <FormGroup>
// 			    <Col smOffset={2} sm={10}>
// 			      <Checkbox>Remember me</Checkbox>
// 			    </Col>
// 			  </FormGroup>

// 			  <FormGroup>
// 			    <Col smOffset={2} sm={10}>
// 			      <Button type="submit">Sign in</Button>
// 			    </Col>
// 			  </FormGroup>
// 			</Form>