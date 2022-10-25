import mongoose from 'mongoose';

import Staff from '../model/User';
import func from '../utils/asyncDecorator';

const getAllUsers = func(async (_req, res, _next) => {
	const users = await Staff.find();

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users,
		},
	});
});

const getUser = func(async (req, res, _next) => {
	const { id } = req.params.id;

	const user = await Staff.findById({ id });

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

export { getAllUsers, getUser };
