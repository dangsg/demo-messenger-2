import { SIGN_UP_DONE } from '../../constants/actionTypes';

export default function signupReducer (state = false, { type }) {
	switch(type) {
		case SIGN_UP_DONE:
			console.log('rec signup')
			return true;
		default:
			return state;
	}
} 