// import dependencies
import express, { Request, Response, NextFunction } from 'express';
import session from 'cookie-session';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';

// imports files
import error from './controller/errorController';
import { APIError, HttpCode } from './utils/APIError';
import staffRouter from './router/userRouter';
import { Logging } from './utils/Logging';

const app = express();

dotenv.config();

// MIDDLEWARE
app.use(express.json());

// logging
if (process.env.NODE_ENV === 'development') {
	app.use((req: Request, _res: Response, next: NextFunction) => {
		Logging.log(`${req.method} - ${req.url} - ${req.socket.remoteAddress}`);

		next();
	});
}

app.use(session);

// set secure HTTP headers
app.use(helmet());

// REDUCE SERVER FINGERPRINT
// just prevents casual exploits
app.disable('x-powered-by');

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
