
import express from 'express'

import staffRouter from './router/staffRouter'
import server from './server.js'

const app = express()

// JSON BODY PARSING
app.use(express.json())

// USE STAFF ROUTER
app.use('app/v1', staffRouter)

// Serving static files
app.use(express.static(`${__dirname}/view`));

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
	next(new Error(`Cannot find ${req.originalUrl} on this server`));
});

// ERROR HANDLING
app.use(error);

module.exports = app;

app.use(server)