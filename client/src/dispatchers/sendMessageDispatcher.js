import axios from 'axios';

import { messageSended } from '../actions/messageAction'
import { receiveError } from '../actions/errorAction';


export const sendMessageDispatch = (friend, message) => async dispatch => {
	axios.post('http://localhost:5000/api/message', ({ friend, message }), { withCredentials: true })
		.then(response => {
			const data = response.data;
			return dispatch(messageSended(data));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		});
};
