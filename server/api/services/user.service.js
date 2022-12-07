import httpStatus from 'http-status';
import _ from 'lodash';
import OrganizationModel from '../models/organization.model.js';
import UserModel from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import { splitDomainFromEmail } from '../utils/stringUtil.js';
import { sendVerificationEmail } from './email.service.js';
import TokenService from './token.service.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
/**
 * Create user
 * @param {Object} userInfo: user info to be saved to create user
 */
const createUser = async (userInfo) => {
  const { email } = userInfo;
  const isEmailTaken = await UserModel.isEmailTaken(email);
  if (isEmailTaken) throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  const emailEscaped = splitDomainFromEmail(email);
  // Map with an organization
  const organization = await OrganizationModel.findOne({ domains: emailEscaped });
  if (!organization) throw new AppError(httpStatus.BAD_REQUEST, 'Organization not supported yet.');
  const user = await UserModel.create({ ...userInfo, organizationId: _.get(organization, '_id'),
    universityName: _.get(organization, 'name') });
  // Send email verification link
  const emailVerificationToken = await TokenService.generateEmailVerificationToken(user._id);
  await sendVerificationEmail(user.email, emailVerificationToken);
  return user;
};

/**
 * Fetch user
 * @param {String} _id: user identifier
 * returns user info
 */
const fetchUserById = async (_id) => {
  const findBy = { '_id': mongoose.Types.ObjectId(_id) };
  const userInfo = await UserModel.findOne(findBy);
  if (!userInfo) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user indentifier provided');
  return userInfo;
};

/**
 * Update user
 * @param {String} _id: user identifier
 * @param {Object} userInfo: user info to be updated
 * @return {Object} updatedUserInfo
 */
const updateUser = async (_id, userInfo) => {
  if (userInfo.email) delete userInfo.email;
  const findBy = { '_id': mongoose.Types.ObjectId(_id) };
  if (userInfo.password) userInfo.password = await bcrypt.hash(userInfo.password, 10);
  const updatedUserInfo = await UserModel.findOneAndUpdate(findBy, userInfo, { new: true });
  if (!updatedUserInfo) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user indentifier provided, update operation failed');
  return updatedUserInfo;
};

/**
 * Delete user
 * @param {String} _id: user identifier
 * @param {Boolean} softDelete: flag to decide whether to update or delete from db
 */
const deleteUser = async (_id, softDelete=true) => {
  const findBy = { '_id': mongoose.Types.ObjectId(_id) };
  if (softDelete) {
    const updateData = { isDeleted: true };
    const updatedUserInfo = await UserModel.findOneAndUpdate(findBy, { $set: updateData }, { new: true });
    if (!updatedUserInfo) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user indentifier provided, delete operation failed');
    return;
  }
  return todo.deleteOne(query);
};

export default {
  createUser,
  fetchUserById,
  updateUser,
  deleteUser,
};
