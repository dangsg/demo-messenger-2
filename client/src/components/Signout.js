import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signoutDispatch } from '../dispatchers/sessionDispatcher';

const mapDispatchToProps = dispatch => ({
	signout: () => dispatch(signoutDispatch())
})

class Signout extends Component {

	render() {
		alert("You have been signed out");
		this.props.signout();
		return <Redirect to='/' />
	}

}

export default connect(null, mapDispatchToProps)(Signout);