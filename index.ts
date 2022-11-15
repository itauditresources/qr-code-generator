// import dependencies
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

// imports files
import error from './controller/errorController';
import { APIError, HttpCode } from './utils/APIError';
import staffRouter from './router/userRouter';
import { Logging } from './utils/Logging';

const app = express();

// MIDDLEWARE
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use((req: Request, _res: Response, next: NextFunction) => {
		Logging.info(`${req.method} - ${req.url} - ${req.socket.remoteAddress}`);

		next();
	});
}

// ROUTERS
app.use('/api/v1/users', staffRouter);

// Serving static files
app.use(express.static(path.join(__dirname, '/view')));

// UNHANDLED ROUTES
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
	next(
		new APIError({
			httpCode: HttpCode.NOT_FOUND,
			description: `Cannot find ${req.originalUrl} on this server`,
		})
	);
});

// ERROR HANDLING
app.use(error);

export default app;
function next() {
	throw new Error('Function not implemented.');
}
