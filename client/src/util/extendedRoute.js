import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = ({ sessionReducer: { username }}) => ({ loggedIn: Boolean(username) })

const Auth = ({ loggedIn, path, component: Component }) => (
	<Route 
		path={path}
		render={props => {
			if (loggedIn) {
				return <Component {...props} />;	
			} else {
				alert("You must sign in first");
				return <Redirect to='/signin' />;
			}  
		}}
	/>
);

const Protected = ({ loggedIn, path, component: Component }) => (
	<Route 
		path={path}
		render={props => {
			return loggedIn ? <Redirect to='/chat' /> : <Component {...props} />
		}}
	/>
);

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);