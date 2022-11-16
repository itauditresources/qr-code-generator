import { Request, Response, NextFunction, CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import session from 'cookie-session';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';

import { User } from '../model/user/user.model';
import asyncWrapper from '../utils/asyncWrapper';
import { APIError, HttpCode } from '../utils/APIError';
import { createResponse } from '../utils/createResponse';

dotenv.config();

const generateToken = (id: string) => {
	const jwt: Promise<string | undefined> = new Promise<string | undefined>((resolve, reject) => {
		jsonwebtoken.sign(
			{ id },
			process.env.SALT as string,
			{
				expiresIn: process.env.JWT_EXPIRES as string,
			},
			(err, token) => {
				if (err) reject(err);
				else resolve(token);
			}
		);
	});
	return jwt;
};

export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const passwordEquals = await bcrypt.compare(password, process.env.HASH as string);

	if (passwordEquals) {
	}
});

export const register = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.create(req.body);

	await user.save();

	const token = await generateToken(user._id);

	if (!token)
		return next(
			new APIError({
				httpCode: HttpCode.INTERNAL_SERVER_ERROR,
				description: 'Could not create JWT',
			})
		);

	const options: CookieOptions = {
		// convert days into milliseconds
		expires: new Date(((Date.now() + Number(process.env.COOKIE_EXPIRES)) as number) * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
	};

	// Remove the password from the output
	user.password = undefined;

	res.cookie('jwt', token, options);

	res.status(HttpCode.CREATED).json(createResponse(true, [token, user], 1));
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
