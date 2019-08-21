const sessionRouter = require('./auth/session');
const userRouter = require('./auth/signup');
const userInfoRouter = require('./userInfo/userInfo');
const friendRouter = require('./friend/friend');
const messageRouter = require('./message/message');

module.exports = {
	sessionRouter,
	userRouter,
	userInfoRouter,
	friendRouter,
	messageRouter
}