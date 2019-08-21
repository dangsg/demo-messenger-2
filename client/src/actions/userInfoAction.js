import { RECEIVE_USERINFO, RECEIVE_NEW_USERNAME, PASSWORD_EDITED, RECEIVE_NEW_AVATAR } from '../constants/actionTypes';

// Receive user information (only email) from database
export const receiveUserInfo = (data) => ({
	type: RECEIVE_USERINFO,
	data
})

// Receive new username (after editing)
export const receiveNewUsername = (data) => ({
	type: RECEIVE_NEW_USERNAME,
	data
})

// Password has been edited
export const passwordEdited = () => ({
	type: PASSWORD_EDITED
}) 

// Avatar has been uploaded
export const avatarUploaded = (data) => ({
	type: RECEIVE_NEW_AVATAR,
	data
})
