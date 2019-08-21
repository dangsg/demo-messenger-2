import { welcome } from '../util/welcomeAPI';
// import { getUserInfo, editUsername, editPassword } from '../util/userAPI';
// import { getUserInfo } from '../util/userAPI';
// import { subscribeSession, receiveSession, clearSession } from '../actions/sessionAction';
// import { receiveUserInfo, editUsername } from '../actions/sessionAction';
// import { receiveError } from '../actions/errorAction';
// import { updateStorage, clearStorage } from '../util/localStorage';


export const welcomeDispatch = user => async dispatch => {
	const res = await welcome(user);
	//data get from server here
	// const data = await res.json();
	console.log(res);
	// if(res.ok) {
		// updateStorage(data);
		// return dispatch(receiveSession(data));
	// }
	// return dispatch(receiveError(data));
};
