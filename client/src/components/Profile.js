import React, { Component} from 'react';
import { connect } from 'react-redux';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { getUserInfoDispatch, editUsernameDispatch, editPasswordDispatch, uploadAvatarDispatch } from '../dispatchers/userInfoDispatcher';

const mapStateToProps = (state) => ({
	username: state.sessionReducer.username,
	email: state.userInfoReducer.email,
	newUsername: state.userInfoReducer.newUsername,
	passwordEdited: state.userInfoReducer.passwordEdited,
	imageUrl: state.userInfoReducer.imageUrl,
	error: state.errorReducer
})
const mapDispatchToProps = dispatch => ({
	getUserInfo: () => dispatch(getUserInfoDispatch()),
	editUsername: (username) => dispatch(editUsernameDispatch(username)),
	editPassword: (newPassword) => dispatch(editPasswordDispatch(newPassword)),
	uploadAvatar: (data) => dispatch(uploadAvatarDispatch(data))
});

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUsername: this.props.username,
			newUsername: "",
			newPassword: "",
			confirmNewPassword: "",
			error: "",
			// email: this.props.email,
			imageUrl: this.props.imageUrl
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleUsernameEditSubmit = this.handleUsernameEditSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handlePasswordEditSubmit = this.handlePasswordEditSubmit.bind(this);
		this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
	}

	componentDidMount() {
		(async () => {
			await this.props.getUserInfo();
		})();
	}

	componentDidUpdate(prevProps) {
		if (Boolean(this.props.newUsername)) {
			alert("Username has been changed!");
			window.location.reload();
		}
		if (Boolean(this.props.passwordEdited)) {
			alert("Password has been edited!");
			window.location.reload();
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			error: nextProps.error,
			imageUrl: nextProps.imageUrl
		})
	}

	handleUsernameChange(e) {
		this.setState({
			newUsername: e.target.value
		});
	}

	handleUsernameEditSubmit(e) {
		e.preventDefault();
		if (this.state.currentUsername !== this.state.newUsername) {
			(async () => {
				await this.props.editUsername(this.state.newUsername);
			})();
		} else {
			this.setState({
				error: "New username is same as old one"
			});
		}
	}

	handlePasswordChange(e) {
		this.setState({
			newPassword: e.target.value
		})
	}
	
	handleConfirmPasswordChange(e) {
		this.setState({
			confirmNewPassword: e.target.value
		})
	}

	handlePasswordEditSubmit(e) {
		e.preventDefault();
		// this.setState({
		// 	error: ""
		// })
		if (this.state.newPassword !== this.state.confirmNewPassword) {
			this.setState({
				error: "New password and the confirm one not matched"
			});
		} else {
			(async() => {
				await this.props.editPassword(this.state.newPassword);
				if (this.props.passwordEdited) {
					alert("Password has been changed!");
					window.location.reload();
				} /*else {
					this.setState({
						error: this.props.error
					})
				}*/
			})();
		}
	}

	handleUploadAvatar(e) {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		data.append('name', 'some name');
		data.append('description', 'some description');
		(async () => await this.props.uploadAvatar(data))();
		// console.log(this.props.imageUrl);
		/*this.setState({
			imageUrl: this.props.imageUrl
		})*/
	}

	render() {
		return (
			<>
				<h1>Profile</h1>
				<p>{this.state.error}</p>
				<div id='profile-wrapper'>
				<div id='profile-left'>
				<form className='avatar-form'>
				<CloudinaryContext cloudName='michidelucifer' >
					<Image publicId={this.state.imageUrl} id='avatar'>
						 <Transformation width="200" height='200' crop="fill"/>
					</Image>						
				</CloudinaryContext>
				<label for='avatar-upload' id='custom-avatar-upload'>Change</label>
				<input id='avatar-upload' type='file' onChange={this.handleUploadAvatar} />
				</form>
				</div>
				<div id='profile-right'>
				<form className='edit-form' onSubmit={this.handleUsernameEditSubmit} >
					<label>Username</label>
					<input type='text' defaultValue={this.state.currentUsername} onChange={this.handleUsernameChange} />
					<input type='submit' value='Edit' />
				</form>
				<form className='edit-form'>
					<label>Email</label>
					<input value={this.props.email} readOnly />
				</form>
				<form className='edit-form' onSubmit={this.handlePasswordEditSubmit} >
					<label>Password</label>
					<input type='password' onChange={this.handlePasswordChange} />
					<input type='submit' value='Change' />
					<label>Confirm password</label>
					<input type='password' onChange={this.handleConfirmPasswordChange} />
				</form>
				</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);