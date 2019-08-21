import { RECEIVE_USERINFO, RECEIVE_NEW_USERNAME, PASSWORD_EDITED, RECEIVE_NEW_AVATAR } from '../../constants/actionTypes';

const _nullUserInfo = { email: null, newUsername: null, passwordEdited: false, imageUrl: "" };
export default function sessionReducer (state = _nullUserInfo, { type, data }) {
	//Object.freeze(state)
	switch (type) {
		case RECEIVE_USERINFO:
			// console.log(data);
			return ({ ...state, email: data.email, imageUrl: data.imageUrl });
		case RECEIVE_NEW_USERNAME:
			// console.log(data.newUsername);
			// console.log(data.username);
			return ({ ...state, newUsername: data.username })
		case PASSWORD_EDITED:
			return ({ ...state, passwordEdited: true })
		case RECEIVE_NEW_AVATAR:
			console.log('new avatar');
			// console.log(data.fileUrl);
			return ({ ...state, imageUrl: data.imageUrl})
		default:
			return state;
	}
}