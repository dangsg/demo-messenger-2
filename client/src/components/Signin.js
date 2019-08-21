import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signinDispatch } from '../dispatchers/sessionDispatcher';
import { clearErrorDispatch } from '../dispatchers/errorDispatcher';

const mapStateToProps = state => ({ 
	error: state.errorReducer,
	loggedIn: Boolean(state.sessionReducer.username) 
});
const mapDispatchToProps = dispatch => ({
	signin: user => dispatch(signinDispatch(user)),
	clearError: () => dispatch(clearErrorDispatch())
});


class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			error: ""
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		});
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		(async() => {
			const user = {
				username: this.state.username,
				password: this.state.password
			}
			await this.props.signin(user);
			this.setState({
				error: ""
			})
		})();
	}

	componentDidUpdate() {
		if (this.props.error !== "") {
			this.setState({
				error: this.props.error
			})
			this.props.clearError(); 
		}
		if (this.props.loggedIn) this.props.history.push('/friend');
	}

	render() {
		return(
			<>
				<h1>mcMessenger Login</h1>
				<p>{this.state.error}</p>
				<form onSubmit={this.handleSubmit} className='sign-form'>
					<label>Username</label>
					<input type='text' required name='username' onChange={this.handleUsernameChange} />
					<label>Password</label>
					<input type='password' required onChange={this.handlePasswordChange}  />
					<label></label>
					<input type='submit' value='Sign In'  />
				</form>
			</>
		)
	}	
} 

export default connect(mapStateToProps, mapDispatchToProps)(Signin);