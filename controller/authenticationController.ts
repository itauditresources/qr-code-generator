import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util';

import { User } from '../model/user.model';
import asyncWrapper from '../utils/asyncWrapper';
import { APIError, HttpCode } from '../utils/APIError';
import { createResponse } from '../utils/response';

const generateToken = (id: string) => {
	const jwt = new Promise((resolve, reject) => {
		jsonwebtoken.sign(
			id,
			process.env.SALT as string,
			{
				expiresIn: process.env.JWT_EXPIRES,
			},
			(err, token) => {
				if (err) reject(err);

				resolve(token);
			}
		);
	});
};

export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const passwordEquals = await bcrypt.compare(password, process.env.HASH as string);

	if (passwordEquals) {
	}
});

export const register = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
	const user = await User.create(req.body);

	await user.save();

	res.status(HttpCode.CREATED).json(createResponse(true, user, 1));
});

export const protect =
	(...roles: String[]) =>
	(req: Request, _res: Response, next: NextFunction) => {
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
