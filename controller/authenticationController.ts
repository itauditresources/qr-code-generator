import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import asyncWrapper from '../utils/asyncWrapper';

export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const passwordEquals = await bcrypt.compare(password, process.env.HASH || '');

	if (passwordEquals) {
		const jwt = jsonwebtoken.sign(password, process.env.SALT || '');
	}
});
