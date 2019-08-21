const express = require('express');
const User = require('../../models/user');

const friendRouter = express.Router();

friendRouter.get('', async(req, res) => {
	// console.log(req.sesison.user,)
	await User.find({}, 'username imageUrl', (err, users) => {
		if (err) res.status(400).send(err.message);
		const friendList = users.filter(user => (user.username !== req.session.user.username)).map(user => ({ username: user.username, imageUrl: user.imageUrl }));
		res.status(200).send({ friendList });
	})
})

module.exports = friendRouter;