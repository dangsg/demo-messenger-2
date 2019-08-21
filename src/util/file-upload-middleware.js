const axios = require('axios');
const cloudinary = require('cloudinary');

function fileUploadMiddleware(req, res) {
	console.log('middle' + req.session.user.userId);
	cloudinary.uploader.upload_stream(result => {
		// console.log(result.secure_url);
		// console.log(req.body.name);
		// console.log(req.body.description);
		// console.log(`http/changeProfile`);
		const imageUrl = result.public_id + '.' + result.format;
		axios({
			url: `http://localhost:5000/api/userInfo/changeProfilePicture`,
			method: 'post',
			data: {
				imageUrl: imageUrl,
				// name: req.body.name,
				// description: req.body.description
				userId: req.session.user.userId 
			},
		}).then(response => {
			// console.log(Object.keys(result));
			// console.log(result.public_id);
			// console.log(result);
			// console.log(result.type);
			// console.log(result.resource_type);
			const imageUrl = result.public_id + '.' + result.format;
			res.status(200).send({ imageUrl })
		}).catch (error => {
			console.log('error 500')
			console.log(Object.keys(error));
			console.log(error.response);
			// res.status(500).json(error.response.data);
			res.status(500).json(error);
		})
	}).end(req.file.buffer);
}

module.exports = fileUploadMiddleware;