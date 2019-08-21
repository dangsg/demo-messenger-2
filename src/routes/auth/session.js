const express = require('express');
const User = require('../../models/user');
const signinValidate = require('../../validation/userValidation').signinValidate;
const compareSync = require('bcryptjs').compareSync;
const sessionizeUser = require('../../util/helper').sessionizeUser;
const parseError = require('../../util/helper').parseError;

const sessionRouter = express.Router();

// Login routing
sessionRouter.post('', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user && compareSync(password, user.password)) {
			const userSession = sessionizeUser(user);
			req.session.user = userSession;
			res.status(200).send({ username: userSession.username });
		}
		else {
			throw new Error('Incorrect Username or Password')
		}
	} catch (err) {
		res.status(401).send(err.message);
	}
})

// Logout routing
sessionRouter.delete('', ({ session }, res) => {
	
	try {
		const user = session.user;
		if (user) {
			session.destroy(err => {
				if (err) {
					throw err;
				}
				//todo: modifty SESSION_NAME's location
				res.clearCookie(process.env.SESSION_NAME);
				res.status(200).send(user);
			})
		} else {
			throw new Error('Error session configuration')
		}
	} catch (err) {
		res.send(parseError(err));
	}
})

sessionRouter.get('', (req, res) => {
	console.log(req.sessionID);
	// res.send({ user: req.session.user });
	res.send(req.sessionID)
})

module.exports = sessionRouter;