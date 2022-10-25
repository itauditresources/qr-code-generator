import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

import app from './index';

const uri = process.env.DB_URI || '';

const options: object = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(uri, options)
	.then(connection => console.log('Database is connected'))
	.catch(err => console.log(err));

const port: Number = process.env.PORT === 'PRODUCTION' ? +process.env['PORT'] : 3001;

const server = app.listen(port, () => {
	console.log(`Server listen on port: ${port}`);
});

// Shutting down the server and exit the nodejs process after an unhandled exception occurs
process.on('uncaughtException', err => {
	console.error(err);
	server.close(() => {
		process.exit(1);
	});
});

// Shutting down the server and exit the nodejs process after an unhandled rejection occurs
process.on('unhandledRejection', err => {
	console.error(err);
	server.close(() => {
		process.exit(1);
	});
});
