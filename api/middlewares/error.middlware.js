/**
 * Error handling middleware
 *  - If known errors with defined error code, send response (catchAsync -> Middleware)
 *  - If error is not a user defined AppError,
 *    propagate it to central errorHandler util (catchAsync -> Middleware -> ErrorHandler)
 * @param {AppError} error
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const errorHandlerMiddleware = (error, req, res, next) => {
	const { code, message } = error;
	if (!code) return next(error); // Propagate to central error handler
	res.status(code).send({ success: false, message });
};

export default errorHandlerMiddleware;
