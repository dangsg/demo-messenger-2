import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getFriendListDispatch } from '../dispatchers/friendDispatcher';

/*const mapStateToProps = (state) => ({ 
	loggedIn: Boolean(state.sessionReducer.username),
	username: state.sessionReducer.username,
	friendList: state.friendReducer 
});
const mapDispatchToProps = dispatch => ({
	getFriendList: () => dispatch(getFriendListDispatch())
});*/

class Welcome extends Component {
	
	/*linkRender() {
		if (this.props.loggedIn) {
			return (
				<>
					<Link to='/chat'>Chat</Link>
					<Link to='/signout'>Signout</Link>
				</>
			);
		} else {
			return (
				<>
					<Link to='/'>Home</Link>
					<Link to='/signin'>Signin</Link>
					<Link to='/signup'>Signup</Link>
				</>
			);
		}
	}

	UNSAFE_componentWillMount() {
		(async () => await this.props.getFriendList())();
	}

	friendListRender() {
		// const friendList = this.props.friendList;
		// console.log(friendList)
		return this.props.friendList.map((friend, i) => (
			<tr>
				<td>{friend}</td>
				<td><Link to={{pathname: '/chat/' + friend}} >Chat now</Link></td>
			</tr>
			));
	}*/

	render () {
			return <h1>Welcome to mcMessenger!</h1>
	}
}

// export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
export default Welcome;