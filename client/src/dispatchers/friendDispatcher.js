import axios from 'axios';

import { receiveFriendList } from '../actions/friendAction';
import { receiveError } from '../actions/errorAction';

export const getFriendListDispatch = () => async dispatch => {
	// Get friend name and avatar 
	axios.get('http://localhost:5000/api/friend', { withCredentials: true })
		.then(response => {
			const data = response.data;
			// console.log(data)
			return dispatch(receiveFriendList(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(receiveError(error.response.data));
		})
}