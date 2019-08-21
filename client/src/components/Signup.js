import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupDispatch } from '../dispatchers/sessionDispatcher';
import { clearErrorDispatch } from '../dispatchers/errorDispatcher';

const mapStateToProps = state => ({ 
	error: state.errorReducer,
	signupDone: state.signupReducer 
});
const mapDispatchToProps = dispatch => ({
	signup: user => dispatch(signupDispatch(user)),
	clearError: () => dispatch(clearErrorDispatch())
})

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			error: ""
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		})
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		})
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};
		(async () => {
			await this.props.signup(user);
			this.setState({
				error: ""
			});
		})();
	}

	componentDidUpdate() {
		if (this.props.error !== "") {
			this.setState({
				error: this.props.error
			})
			this.props.clearError()
		}
		// console.log(this.props.si)
		if (this.props.signupDone) {
			alert("Sign Up successfully");
			this.props.history.push('/signin')
		}
	}

	render() {
		return(
			<>
				<h1>Create an account</h1>
				<p>{this.state.error}</p>
				<form onSubmit={this.handleSubmit} className='sign-form'>
					<label>Username</label> 
					<input type='text' required onChange={this.handleUsernameChange} />
					<label>Email</label>
					<input type='email' required onChange={this.handleEmailChange} />
					<label>Password</label>
					<input type='password' required value={this.state.password} onChange={this.handlePasswordChange} />
					<label></label>
					<input type='submit' value='Sign Up' />
				</form>
			</>
		)
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);