import { RECEIVE_FRIENDLIST } from '../constants/actionTypes';

export const receiveFriendList = data => ({
	type: RECEIVE_FRIENDLIST,
	data
})