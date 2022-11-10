import { Response, Request, NextFunction } from 'express';

import Staff from '../model/User';
import asyncWrapper from '../utils/asyncWrapper';
import { HttpCode } from '../utils/APIError';
import { createResponse } from '../utils/responseBody';

export const getAllUsers = asyncWrapper(async (_req: Response, res: Response, _next: NextFunction) => {
	const users = await Staff.find();

	res.status(HttpCode.OK).json(createResponse(true, users, users.length));
});

export const getUser = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;

	const user = await Staff.findById({ _id: id });

	res.status(HttpCode.OK).json({
		status: 'success',
		data: {
			user,
		},
	});
});
