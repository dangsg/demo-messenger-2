import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

import { getFriendListDispatch } from '../dispatchers/friendDispatcher';

const mapStateToProps = (state) => ({ 
	username: state.sessionReducer.username,
	friendList: state.friendReducer 
});
const mapDispatchToProps = dispatch => ({
	getFriendList: () => dispatch(getFriendListDispatch())
});

class Friend extends Component {

	constructor(props) {
		super(props);

		this.state = {
			friendList: this.props.friendList
		}
	}
	
/*	linkRender() {
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
*/
	componentDidMount() {
		(async () => await this.props.getFriendList())();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.friendList !== this.props.friendList) {
			this.setState({
				friendList: this.props.friendList
			})
		}
	}

	friendListRender() {
		return this.state.friendList.map((friend, i) => (
			<tr>
				<td>
					<CloudinaryContext cloudName='michidelucifer' >
						<Image publicId={friend.imageUrl} className='mini-avatar'>
							 <Transformation width="50" height='50' crop="fill"/>
						</Image>						
					</CloudinaryContext>
				</td>
				<td>{friend.username}</td>
				<td><Link to={{pathname: '/chat/' + friend.username}} >Chat now</Link></td>
			</tr>
			));
	}

	render () {
		return (	
			<>
				<h1>Hello, {this.props.username}!</h1>	
				<table id='friend-list'>
					<thead>
						<tr>
							<th>Avatar</th>
							<th>Nickname</th>
							<th>Chat</th>
						</tr>
					</thead>
					<tbody>
						{this.friendListRender()}
					</tbody>
				</table>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Friend);