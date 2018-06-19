import React, { Component } from 'react';

class Signup extends Component {
	render() {
		return (
			<div>
				<h1><span class="fa fa-sign-in"></span> Signup</h1>

				<div class="alert alert-danger"></div>

				<form action="/api/signup" method="post">
					<div class="form-group">
					    <label>Email</label>
					    <input type="text" class="form-control" name="email"/>
					</div>
					<div class="form-group">
					    <label>Password</label>
					    <input type="password" class="form-control" name="password"/>
					</div>

					<button type="submit" class="btn btn-warning btn-lg">Signup</button>
				</form>

				<hr/>

				<p>Already have an account? <a href="/login">Login</a></p>
				<p>Or go <a href="/">home</a>.</p>
			</div>
		);
	}
}

export default Signup;