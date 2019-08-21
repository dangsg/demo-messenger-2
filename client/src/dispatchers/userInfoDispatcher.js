import axios from 'axios';

import { receiveUserInfo, receiveNewUsername, passwordEdited, avatarUploaded } from '../actions/userInfoAction';
import { receiveError } from '../actions/errorAction';
import { updateStorage } from '../util/localStorage';

export const getUserInfoDispatch = () => async dispatch => {
	// Reponse with email and avatar
	axios.get('http://localhost:5000/api/userInfo', { withCredentials: true })
		.then(response => {
			const data = response.data;
			console.log(data);
			updateStorage(data);
			return dispatch(receiveUserInfo(data));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})
}

export const editUsernameDispatch = (username) => async dispatch => {
	axios.put('http://localhost:5000/api/userInfo/edit-username', { username }, { withCredentials: true })
		.then(response => {
			const data = response.data;
			// console.log(data);
			updateStorage(data);
			return dispatch(receiveNewUsername(data));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})	
}

export const editPasswordDispatch = (password) => async dispatch => {
	axios.put('http://localhost:5000/api/userInfo/edit-password', { password }, { withCredentials: true })
		.then(response => {
			return dispatch(passwordEdited());
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})
}

export const uploadAvatarDispatch = (data) => async dispatch => {
	axios.post('http://localhost:5000/api/userInfo/upload-avatar', data, { withCredentials: true })
		.then(response => {
			const result = response.data;
			updateStorage(result);
			return dispatch(avatarUploaded(result));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})
}