/**
 * AppError(code, message)
 */
class AppError extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
}

export default AppError;
