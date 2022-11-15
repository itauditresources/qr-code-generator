import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../model/user.model';
import asyncWrapper from '../utils/asyncWrapper';
import { APIError, HttpCode } from '../utils/APIError';
import { createResponse } from '../utils/response';

export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const passwordEquals = await bcrypt.compare(password, process.env.HASH as string);

	if (passwordEquals) {
		const jwt = jsonwebtoken.sign(password, process.env.SALT as string);
	}
});

export const register = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
	const user = await User.create(req.body);

	res.status(HttpCode.CREATED).json(createResponse(true, user, 1));
});

export const protect =
	(...roles: String[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		// protect routes based on user roles
		// default: user
		// req.user.role is set at the login middleware
		// @ts-ignore
		if (!roles.includes(req.user.role))
			return next(
				new APIError({
					httpCode: HttpCode.UNAUTHORIZED,
					description: 'You do not have access to this resource',
				})
			);

		next();
	};
