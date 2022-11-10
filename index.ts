// import dependencies
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

// import controllers
import error from './controller/errorController';

// import utilities
import { APIError, HttpCode } from './utils/APIError';

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
