import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { User } from '../model/user.model';
import asyncWrapper from '../utils/asyncWrapper';
import { APIError, HttpCode } from '../utils/APIError';
import { createResponse } from '../utils/response';

// Hiding __v is going to prevent Mongoose from being able to find the model instance
// (and update its __v) on a save unless you explicitly include those fields in the find method

export const getAllUsers = asyncWrapper(async (_req: Response, res: Response, _next: NextFunction) => {
	const users = await User.find();

	res.status(HttpCode.OK).json(createResponse(true, users, users.length));
});

export const getUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	const user = await User.findById({ _id: new ObjectId(id) });

	if (!user)
		return next(
			new APIError({
				httpCode: HttpCode.NOT_FOUND,
				description: `User with id: ${id} not found`,
			})
		);

	res.status(HttpCode.OK).json(createResponse(true, user, 1));
});
