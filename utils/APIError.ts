class APIError extends Error {
	statusCode: Number;
	status: String;
	isOperational: Boolean;

	/**
	 * Custom error class with the http status code
	 * @param message
	 * @param statusCode
	 */
	constructor(message: string, statusCode: Number) {
		super(message);

		this.statusCode = statusCode;
		this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default APIError;
