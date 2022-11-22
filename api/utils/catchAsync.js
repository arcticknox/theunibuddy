/**
 * Catch errors from services and pass it on to error middleware
 * @param {Function} fn
 */
const catchAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
