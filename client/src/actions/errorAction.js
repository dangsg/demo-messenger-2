import { RECEIVE_ERROR, CLEAR_ERROR } from '../constants/actionTypes';

export const receiveError = message => ({
	type: RECEIVE_ERROR,
	message
});

export const clearError = () => ({
	type: CLEAR_ERROR
})