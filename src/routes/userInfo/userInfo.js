const express = require('express');
const multer = require('multer');
const User = require('../../models/user');
const parseError = require('../../util/helper').parseError;
const usernameValidate = require('../../validation/userValidation').usernameValidate;
const passwordValidate = require('../../validation/userValidation').passwordValidate;
const fileUploadMiddleware = require('../../util/file-upload-middleware');

const userInfoRouter = express.Router();

// Get user information (email and image) 
userInfoRouter.get('', async (req, res) => {
	try {
		const user = await User.findById(req.session.user.userId, 'email imageUrl');
		res.status(200).send({ email: user.email, imageUrl: user.imageUrl });	
	} catch (err) {
		res.status(400).send(err.message);
	}
});

// Edit username
userInfoRouter.put('/edit-username', async (req, res) => {
	console.log(req.body)
	try {
		const newUsername = req.body.username;
		await usernameValidate(newUsername);
		let count = await User.countDocuments({ username: newUsername });
		if (count !== 0) throw new Error("Username has already existed")
		await User.findById(req.session.user.userId, 'username', (err, user) => {
			user.username = newUsername;
			user.save();
		});
		req.session.user.username = newUsername;
		res.status(200).send({ username: newUsername });
	} catch (err) {
		// console.log(err.message)
		res.status(400).send(err.message);
	}
});

userInfoRouter.put('/edit-password', async (req, res) => {
	try {
		const newPassword = req.body.password;
		passwordValidate(newPassword);
		await User.findByIdAndUpdate(req.session.user.userId, { password: newPassword });
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message)
	}
})

const storage = multer.memoryStorage();
const upload = multer({ storage });

userInfoRouter.post('/upload-avatar', upload.single('file'), fileUploadMiddleware) 
userInfoRouter.post('/changeProfilePicture', async (req, res) => {
	// console.log('url ' + req.body.imageUrl);
	// console.log('change ' + req.sessionID)
	// console.log('id ' + req.body.userId)
	// console.log(res.body);
	try {
		await User.findByIdAndUpdate(req.body.userId, { imageUrl: req.body.imageUrl });
		res.end();
	} catch (err) {
		res.status(400).send(parseError(err))
	}
})

module.exports = userInfoRouter;