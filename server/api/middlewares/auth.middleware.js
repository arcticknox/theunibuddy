import passport from 'passport';
import httpStatus from 'http-status';
import AppError from '../utils/AppError.js';
import config from '../../config/index.js';
import _ from 'lodash';

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};

/**
 * JWT Auth Middleware
 */
const authMiddleware= (req, res, next) => {
  new Promise((resolve, reject) => {
    _.find(config.authMiddleware.ignoreList, (str) => {
      if (str === req.originalUrl.slice(1)) {
        return resolve();
      }
    });
    passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject),
    )(req, res, next);
  })
      .then(() => next())
      .catch((error) => next(error));
};

export default authMiddleware;
