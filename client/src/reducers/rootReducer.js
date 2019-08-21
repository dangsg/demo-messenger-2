import { combineReducers } from 'redux';
import errorReducer from './errorReducer/errorReducer';
import sessionReducer from './sessionReducer/sessionReducer';
import userInfoReducer from './userInfoReducer/userInfoReducer';
import messageReducer from './messageReducer/messageReducer';
import friendReducer from './friendReducer/friendReducer';
import signupReducer from './signupReducer/signupReducer';

export default combineReducers({
	signupReducer,
	sessionReducer,
	errorReducer,
	userInfoReducer,
	messageReducer,
	friendReducer
})