import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/extendedRoute';

import Welcome from './Welcome';
import Signin from './Signin';
import Signup from './Signup';
import Signout from './Signout';
import Chat from './Chat';
import Profile from './Profile';
import Friend from './Friend';

const mapStateToProps = ({ sessionReducer: { username }}) => ({ loggedIn: Boolean(username) })

class App extends Component {

	headerRender() {
		if (this.props.loggedIn) {
			return (
				<ul>
					<li><Link to="/friend">Friend</Link></li>
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/signout">Sign Out</Link></li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/signin">Sign In</Link></li>
					<li><Link to="/signup">Sign Up</Link></li>
				</ul>
			)
		}
	}

	render() {
		return (
			<>	
				<BrowserRouter>
					<header>
						<nav>{this.headerRender()}</nav>
					</header>
					
					<Route exact path='/' component={Welcome} />
					<ProtectedRoute path='/signin' component={Signin} />
					<ProtectedRoute path='/signup' component={Signup} />
					<AuthRoute path='/signout' component={Signout} />
					<AuthRoute path='/chat/:friend' component={Chat} />
					<AuthRoute path='/profile' component={Profile} />
					<AuthRoute path='/friend' component={Friend} />
				</BrowserRouter>
			</>
	  	)
	}
}

export default connect(mapStateToProps)(App);