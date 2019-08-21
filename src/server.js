const express = require('express');
// const https = require('https');
const session = require('express-session');
const mongoose = require('mongoose');
const connectStore = require('connect-mongo');
const fs = require('fs');
const { userRouter, sessionRouter, userInfoRouter, friendRouter, messageRouter } = require('./routes/routes')
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary');
// const io = require('socket.io');

require('dotenv').config();

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
		console.log('Database connected');
		
		const app = express();
		const http = require('http').createServer(app);
		const io = require('socket.io')(http);

		const MongoStore = connectStore(session);

		app.disable('x-powered-by');

		app.use(cors({
			credentials: true,
			origin: 'http://localhost:3000'
		}));

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		app.use(session({
			name: process.env.SES_NAME,
			secret: process.env.SES_SECRET || 'another secret from heroku',
			saveUninitialized: true,
			resave: false,
			store: new MongoStore({
				mongooseConnection: mongoose.connection,
				collection: 'mcmsSession',
				ttl: parseInt(process.env.SES_TIME)
			}),
			cookie: {
				httpOnly: true,
				samesite: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: parseInt(process.env.SES_TIME) * 1000 //miliseconds
			}
		}));

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUD_API_KEY,
			api_secret: process.env.CLOUD_API_SECRET
		})
		
		const apiRouter = express.Router();
		app.use('/api', apiRouter);
		apiRouter.use('/user', userRouter);
		apiRouter.use('/session', sessionRouter);
		apiRouter.use('/userInfo', userInfoRouter);
		apiRouter.use('/message', messageRouter(io));
		apiRouter.use('/friend', friendRouter);



		const listener = http.listen(process.env.PORT, () => {
			console.log('Listening on port ' + listener.address().port)
		});
	} catch (err) {
		console.log(err);
	}
})();