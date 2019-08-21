import { RECEIVE_FRIENDLIST } from '../../constants/actionTypes';

// const emptyFriendList = [];
export default function (state = [], { type, data }) {
	switch(type) {
		case RECEIVE_FRIENDLIST:
			return data.friendList;
		default:
			return state;
	}
}