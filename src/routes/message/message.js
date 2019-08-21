const express = require('express');
const parseError = require('../../util/helper').parseError;
const User = require('../../models/user');
const Message = require('../../models/message');

const saveMessage = async (from, to, message) => {
	try {
		const fromUser = await User.findOne({ username: from }, 'messages');
		let conversation = await fromUser.messages.find(ele => ele.friend === to);
		if (!conversation) {
			const newMessage = new Message ({
				username: from,
				message: message
			});
			await newMessage.save();
			fromUser.messages.push({
				friend: to,
				conversationId: newMessage._id
			})
			await fromUser.save();
			const toUser = await User.findOne({ username: to }, 'messages');
			toUser.messages.push({
				friend: from,
				conversationId: newMessage._id
			})
			await toUser.save();
		}
		else {
			const currentConversation = await Message.findOne({ _id: conversation.conversationId }, 'conversation');
			currentConversation.conversation.push({
				username: from,
				message: message
			})
			await currentConversation.save();
		}
	} catch (error) {
		console.log(error);
	}
	// console.log(user.messages);
}

const messageRouter = (io) => {

	const messageRoute = express.Router();

	// messageRoute.use((req, res) => { });
	/*try {
		const { friend, message } = req.body;
		const username = req.session.user.username;
		
		User.findById(req.session.user.userId, 'messages', (err, user) => {
			if(err) throw err;
			const data = user.messages.find(ele => ele.friend === friend).conversation;
			res.status(200).send({ data });
		})

	} catch (err) {
		res.status(400).send(err.messages);
	}*/

	// io.use((socket, next) => {
	// 		// console.log(socket.id + '-' + socket.handshake.query.username);
	// 		io.userList = io.userList 
	// 		? [...io.userList, {socketId: socket.id, username: socket.handshake.query.username}]
	// 		: [{socketId: socket.id, username: socket.handshake.query.username}] 
	// 		// console.log(socket.id + '-' + socket.handshake.query.username);
	// 		console.log(io.userList);
	// 		next();
	// 	})

	io.on('connection', socket => {
		// console.log('a user connected');
		// console.log('adid: ' + socket.id);

		if (io.onlineUsers) {
			io.onlineUsers.push({
				socketId: socket.id,
				username: socket.handshake.query.username
			})
		}
		else {
			io.onlineUsers = [{
				socketId: socket.id,
				username: socket.handshake.query.username
			}]
		}
				// console.log(socket.id);
				// console.log(io.onlineUsers)
			socket.on('send message', data => {
				const { from, to, message } = data;
				// console.log(from);
				saveMessage(from, to, message);
				const toUser = io.onlineUsers.find(user => user.username === to);
				if (toUser) { // toUser is online
					const toSocketId = toUser.socketId;
					io.to(toSocketId).emit('send message', data)
				}
			})
			socket.on('disconnect', () => {
				// console.log('user disconnected')
				// console.log('rmid: ' + socket.id)
				//todo remove user from onlineUsers
				io.onlineUsers = io.onlineUsers.filter(user => user.socketId !== socket.id)
			})
	})

	return messageRoute;

}

module.exports = messageRouter;

/*try {
		await User.findOne({ username: from }, 'messages', async (err, user) => {
			if(err) {
				throw err;
			}
			let contact = user.messages.find(ele => ele.friend === to);
			if(contact) {
				contact.conversation.push({ username: from, message });
			}
			else {
				user.messages.push({
					friend: to,
					conversation: [{
						username: from,
						message
					}]
				})
			}
			await user.save();
		});
		await User.findOne({ username: to }, 'messages', async (err, user) => {
			if(err) throw err;
			let contact = user.messages.find(ele => ele.friend === from);
			if(contact) {
				contact.conversation.push({ username: from, message });
			}
			else {
				user.messages.push[{
					friend: username,
					conversation: [{
						username,
						message
					}]
				}]
			}
			await user.save();
		});
	}*/