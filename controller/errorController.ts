import APIError from '../utils/APIError';

const devError = (res, err) => {
	res.send().json({
		status: 'fail',
		data: {
			statusCode: err.statusCode,
			message: err.message,
		},
	});
};

export default (req, res, err, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'fail';

	if (process.env.NODE_ENV === 'development') devError(res, err);
};
