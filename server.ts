const dotenv = require('dotenv').config();

import app from './index';

const port: Number = process.env['ENV'] === 'PRODUCTION' ? +process.env['PORT'] : 3000;

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
	console.error(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
