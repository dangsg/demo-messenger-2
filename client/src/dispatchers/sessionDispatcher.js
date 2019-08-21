import axios from 'axios';

import { signUpDone, receiveSession, clearSession } from '../actions/sessionAction';
import { receiveError } from '../actions/errorAction';
import { updateStorage, clearStorage } from '../util/localStorage';

// Send signup request to server then dispatch action
export const signupDispatch = user => dispatch => {
	axios.post('http://localhost:5000/api/user', user, { withCredentials: true })
		.then(response => {
			console.log('dispatch signUpDone')
			return dispatch(signUpDone());
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data)); //data is error message from server
		})
};

// Send login request to server then dispatch action
export const signinDispatch = user => dispatch => {
	axios.post('http://localhost:5000/api/session', user, { withCredentials: true })
		.then(response => {
			const data = response.data;
			updateStorage(data); //save username and avatar in sessionStorage of browser
			return dispatch(receiveSession(data));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data)); //data is error message from server
		});
};

// Sign out and tell server to delete session information
export const signoutDispatch = () => dispatch => {
	axios.delete('http://localhost:5000/api/session', { withCredentials: true })
		.then(response => {
			clearStorage(); //clear sessionStorage
			return dispatch(clearSession());
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})
};

