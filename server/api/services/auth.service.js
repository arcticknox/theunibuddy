import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import UserModel from '../models/user.model.js';
import TokenModel from '../models/token.model.js';
import OtpToUserModel from '../models/otpToUserMap.model.js';
import TokenService from './token.service.js';
import AppError from '../utils/AppError.js';
import config from '../../config/index.js';
import { sendOtpEmail } from './email.service.js';
import otpUtil from '../utils/otpUtil.js';
/**
 * Check user sent password with saved password
 * @param {String} userSentPassword
 * @param {String} password
 * @returns
 */
const checkPasswordMatch = async (userSentPassword, password) => bcrypt.compare(userSentPassword, password);

const getLoginQuery = (email) => {
  if (config.app.env !== 'dev') return { email, isEmailVerified: true };
  return { email };
};
/**
 * Login with email and password
 * @param {String} email
 * @param {String} password
 * @returns
 */
const loginWithEmail = async (email, password) => {
  const query = getLoginQuery(email);
  const user = await UserModel.findOne(query);
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email or password or email not verified. Please check and try again.');
  const passwordMatch = await checkPasswordMatch(
      password,
      _.get(user, 'password'),
  );
  if (!passwordMatch) {
    throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Incorrect email or password or email not verified. Please check and try again.',
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
    const user = await UserModel.findOne({ _id: refreshTokenDoc.user._id });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED);
    }
    await refreshTokenDoc.remove();
    return TokenService.generateAuthTokens(user);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * User email verification
 * @param {String} token
 */
const verifyEmail = async (token) => {
  const verifiedToken = await TokenService.verifyToken(token, 'email-verify');
  if (!verifiedToken) throw new AppError(httpStatus.BAD_REQUEST, 'Verification failed');
  const userInfo = await UserModel.findOne({ _id: verifiedToken.user });
  await TokenModel.deleteMany({ user: userInfo._id, type: 'email-verify' }); // Delete token
  // Set email as verified
  await UserModel.findOneAndUpdate({ _id: userInfo._id }, { $set: { isEmailVerified: true } });
};

/**
 * User password reset activity
 * @param {String} email for which password reset is requested
 */
const passwordReset = async (email) => {
  const userInfo = await UserModel.findOne({ email });
  if (!_.isEmpty(userInfo) && userInfo.isEmailVerified && !userInfo.isDeleted) {
    const { token, totpSecret } = otpUtil.generateOTP();
    await OtpToUserModel.findOneAndUpdate({ email }, { email, otp: token, totpSecret }, { upsert: true });
    await sendOtpEmail(userInfo.email, token);
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email or email not verified. Please check and try again!');
  }
};

/**
 * User password reset verification and saving new password
 * @param {String} email for which password reset should be verified
 * @param {String} otp sent to user email for verification
 * @param {String} newPassword new password to be saved against the user
 */
const verifyPasswordReset = async (email, otp, newPassword) => {
  const otpToUserMap = await OtpToUserModel.findOne({ email });
  const userInfo = await UserModel.findOne({ email });
  if (!_.isEmpty(otpToUserMap) && !_.isEmpty(userInfo) && !userInfo.isDeleted) {
    if (otpToUserMap.otp === otp && otpUtil.verifyOTP(otp, otpToUserMap.totpSecret)) {
      userInfo.password = newPassword;
      await OtpToUserModel.deleteOne({ email });
      return userInfo.save();
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect OTP provided or OTP expired. Please check and try again!');
    }
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please check and try again!');
  }
};

export default {
  loginWithEmail,
  logout,
  refreshAuthToken,
  verifyEmail,
  passwordReset,
  verifyPasswordReset,
};
