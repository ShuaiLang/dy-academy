import React, { Component } from 'react';

class Login extends Component {
	render() {
		return (
			<div>
				<h1><span class="fa fa-sign-in"></span> Login</h1>

				<div class="alert alert-danger"></div>

				<form action="/api/login" method="post">
					<div class="form-group">
					    <label>Email</label>
					    <input type="text" class="form-control" name="email"/>
					</div>
					<div class="form-group">
					    <label>Password</label>
					    <input type="password" class="form-control" name="password"/>
					</div>

					<button type="submit" class="btn btn-warning btn-lg">Log in</button>
				</form>

				<hr/>

				<p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a>.</p>
			</div>
		);
	}
}

export default Login;