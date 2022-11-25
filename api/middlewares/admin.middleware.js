import httpStatus from 'http-status';
import _ from 'lodash';
import AppError from '../utils/AppError.js';

/**
 * Admin Auth Middleware
 */
const adminAuthMiddleware = () => (req, res, next) => {
  if (_.get(req, 'user.role', 'user') !== 'user') return next();
  throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized.');
};

export default adminAuthMiddleware;
