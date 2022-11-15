export enum Body {
	success = 'success',
	error = 'error',
}

export const createResponse = (success: Boolean, data: any, n?: Number, message?: String) => {
	return {
		success: success ? 'success' : 'fail',
		results: n ? n : null,
		message: message ? message : '',
		data,
	};
};
