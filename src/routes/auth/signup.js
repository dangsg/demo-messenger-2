const express = require('express');
const User = require('../../models/user');
const { sessionizeUser } = require('../../util/helper');
const { signupValidate } = require ('../../validation/userValidation');

const signupRouter = express.Router();

signupRouter.post('', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		signupValidate(username, email, password);
		
		const newUser = new User({ username, email, password });
		// const userSession = sessionizeUser(newUser);
		await newUser.save();
		
		// req.session.user = userSession;
		// res.send(userSession);
		res.status(200).send();
	} catch(err) {
		res.status(400).send(err.message);
	}
})

module.exports = signupRouter;