import { MESSAGE_SENDED } from '../../constants/actionTypes';

// const initialConversation = [];
export default function messageReducer (state = [], { type, data }) {
	switch(type) {
		case MESSAGE_SENDED:
			// let newState = state.slice();
			return data;
		default: 
			return state; 
	}
}