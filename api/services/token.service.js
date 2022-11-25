import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import TokenModel from '../models/token.model.js';
import AppError from '../utils/AppError.js';
import config from '../../config/index.js';

/**
 * Generate JWT Token
 * @param {String} userId
 * @param {Date} expires
 * @param {String} type
 */
const generateJWT = (userId, expires, type) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, config.jwt.privateKey, {algorithm: config.jwt.algorithm});
};

/**
 * Save token to db
 * @param {String} token
 * @param {String} userId
 * @param {Date} expires
 * @param {String} type
 * @returns
 */
const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });
  return tokenDoc;
};

/**
 * Verify token
 * @param {String} token
 * @param {String} type
 * @returns
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.publicKey, {algorithm: config.jwt.algorithm});
  const tokenDoc = await TokenModel.findOne({
    token,
    type,
    user: payload.sub,
  });
  if (!tokenDoc) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }
  return tokenDoc;
};

/**
 * Generate access and refresh tokens
 * @param {String} userId
 * @return
 * TODO: Get expiry from config
 */
const generateAuthTokens = async (userId) => {
  const accessTokenExpires = moment().add(720, 'minutes');
  const accessToken = generateJWT(userId, accessTokenExpires, 'access');

  const refreshTokenExpires = moment().add(7, 'days');
  const refreshToken = generateJWT(userId, refreshTokenExpires, 'refresh');
  await saveToken(refreshToken, userId, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate email verification token
 * @param {String} userId
 */
const generateEmailVerificationToken = async (userId) => {
  const tokenExpires = moment().add(720, 'minutes');
  const token = generateJWT(userId, tokenExpires, 'email-verify');
  await saveToken(token, userId, tokenExpires, 'email-verify');
  return token;
};

export default {
  generateJWT,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateEmailVerificationToken,
};
