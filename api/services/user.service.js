import httpStatus from 'http-status';
import UserModel from '../models/user.model.js';
import AppError from '../utils/AppError.js';

/**
 * Create user
 * @param {Object} userInfo
 */
const createUser = async (userInfo) => {
  const {email} = userInfo;
  const isEmailTaken = await UserModel.isEmailTaken(email);
  if (isEmailTaken) throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  const user = await UserModel.create(userInfo);
  return user;
};

export default {
  createUser,
};
