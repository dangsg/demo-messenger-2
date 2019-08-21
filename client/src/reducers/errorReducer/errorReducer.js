import { RECEIVE_ERROR, CLEAR_ERROR } from '../../constants/actionTypes';

export default function errorReducer (state = "", { type, message }) {
	switch (type) {
		case RECEIVE_ERROR:
			// console.log(message);
			return message;
		case CLEAR_ERROR:
		default:
			return "";
			// return state;
	}
}