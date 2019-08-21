import { RECEIVE_SESSION, CLEAR_SESSION } from '../../constants/actionTypes';

const nullSession = { userId: null, username: null};
export default function sessionReducer (state = nullSession, { type, user }) {
	//Object.freeze(state)
	switch (type) {
		case RECEIVE_SESSION:
			return user;
		case CLEAR_SESSION:
			// console.log('clear ss');
			return nullSession;
		default:
			// console.log('default');
			// console.log(state);
			return state;
	}
}