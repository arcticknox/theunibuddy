import httpStatus from 'http-status';
import _ from 'lodash';
import OrganizationModel from '../models/organization.model.js';
import UserModel from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import {splitDomainFromEmail} from '../utils/stringUtil.js';

/**
 * Create user
 * @param {Object} userInfo
 */
const createUser = async (userInfo) => {
  const {email} = userInfo;
  const isEmailTaken = await UserModel.isEmailTaken(email);
  if (isEmailTaken) throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  const emailEscaped = splitDomainFromEmail(email);
  const organization = await OrganizationModel.findOne({domains: emailEscaped});
  if (!organization) throw new AppError(httpStatus.BAD_REQUEST, 'Organization not supported yet.');
  const user = await UserModel.create({...userInfo, organizationId: _.get(organization, '_id')});
  return user;
};

export default {
  createUser,
};
