import { SIGN_UP_DONE, RECEIVE_SESSION, CLEAR_SESSION } from '../constants/actionTypes';

// Signup successfully
export const signUpDone = () => ({
	type: SIGN_UP_DONE
})

// Login to receive session
export const receiveSession = user => ({
	type: RECEIVE_SESSION,
	user
});

// Logout to clear session
export const clearSession = () => ({
	type: CLEAR_SESSION
});