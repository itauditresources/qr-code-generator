// import dependencies
import express = require('express');

// import controllers
import error from './controller/errorController';

// import utilities
import APIError from './utils/APIError';

// import routers
import staffRouter from './router/staffRouter';

const app = express();

// JSON BODY PARSING
app.use(express.json());

// USE STAFF ROUTER
app.use('app/v1', staffRouter);

// Serving static files
app.use(express.static(`${__dirname}/view`));

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
	next(new Error(`Cannot find ${req.originalUrl} on this server`));
});

// ERROR HANDLING
app.use(error);

export default app;
