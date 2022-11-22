import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import UserModel from '../models/user.model.js';
import TokenModel from '../models/token.model.js';
import TokenService from './token.service.js';
import AppError from '../utils/AppError.js';

/**
 * Check user sent password with saved password
 * @param {String} userSentPassword
 * @param {String} password
 * @returns
 */
const checkPasswordMatch = async (userSentPassword, password) => bcrypt.compare(userSentPassword, password);

/**
 * Login with email and password
 * @param {String} email
 * @param {String} password
 * @returns
 */
const loginWithEmail = async (email, password) => {
  const user = await UserModel.findOne({email});
  const passwordMatch = await checkPasswordMatch(
      password,
      _.get(user, 'password'),
  );
  if (!user || !passwordMatch) {
    throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Incorrect email or password. Please check and try again.',
    );
  }
  return user;
};

/**
 * Logout and revoke tokens
 * @param {String} refreshToken
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await TokenModel.findOne({
    token: refreshToken,
    type: 'refresh',
  });
  if (!refreshTokenDoc) throw new AppError(httpStatus.NOT_FOUND, 'Not found');
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {String} refreshToken
 * @returns
 */
const refreshAuthToken = async (refreshToken) => {
  try {
    const refreshTokenDoc = await TokenService.verifyToken(
        refreshToken,
        'refresh',
    );
    const user = await UserModel.findOne({_id: refreshTokenDoc.user._id});
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED);
    }
    await refreshTokenDoc.remove();
    return TokenService.generateAuthTokens(user);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  loginWithEmail,
  logout,
  refreshAuthToken,
};
