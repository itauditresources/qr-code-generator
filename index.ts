// import dependencies
const express = require('express');
const path = require('path');

// import controllers
import error from './controller/errorController';

// import utilities
import APIError from './utils/APIError';

// import routers
import staffRouter from './router/userRouter';

const app = express();

// JSON BODY PARSING
app.use(express.json());

// USE STAFF ROUTER
app.use('/api/v1/users', staffRouter);

// Serving static files
app.use(express.static(path.join(__dirname, '/view')));

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
	next(new APIError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// ERROR HANDLING
app.use(error);

export default app;
