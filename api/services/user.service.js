import httpStatus from 'http-status';
import _ from 'lodash';
import OrganizationModel from '../models/organization.model.js';
import UserModel from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import {splitDomainFromEmail} from '../utils/stringUtil.js';
import {sendVerificationEmail} from './email.service.js';
import TokenService from './token.service.js';

/**
 * Create user
 * @param {Object} userInfo
 */
const createUser = async (userInfo) => {
  const {email} = userInfo;
  const isEmailTaken = await UserModel.isEmailTaken(email);
  if (isEmailTaken) throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  const emailEscaped = splitDomainFromEmail(email);
  // Map with an organization
  const organization = await OrganizationModel.findOne({domains: emailEscaped});
  if (!organization) throw new AppError(httpStatus.BAD_REQUEST, 'Organization not supported yet.');
  const user = await UserModel.create({...userInfo, organizationId: _.get(organization, '_id')});
  // Send email verification link
  const emailVerificationToken = await TokenService.generateEmailVerificationToken(user._id);
  await sendVerificationEmail(user.email, emailVerificationToken);
  return user;
};

export default {
  createUser,
};
