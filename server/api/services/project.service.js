import ProjectGroupModel from '../models/project.model.js';
import UserModel from '../models/user.model.js';
import _ from 'lodash';
import AppError from '../utils/AppError.js';
import httpStatus from 'http-status';

/**
 * Create project group
 * @param {Object} userInfo
 */
const createProjectGroup = async (userInfo, userId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const group = await ProjectGroupModel.findOne( { members: userId, isDeleted: false } );
    if ( ! _.isEmpty(group) ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Error: User already has a project group. Message: Please leave the exisiting group before creating a new one.');
    }
    userInfo.members = [userId];
    const newGroup = await new ProjectGroupModel(userInfo);
    return newGroup.save();
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Error: The User doesnot exist');
  }
};

/**
 * Get groups
 */
const getProjectGroups = async () => {
  const groups = await ProjectGroupModel.find({ isDeleted: false });
  return groups;
};

/**
 * Update Project Group
 * @param {String} groupId
 * @param {Object} groupInfo
 */
const updateProjectGroup = async (groupId, groupInfo) => {
  const group = await ProjectGroupModel.findById(groupId);
  if (! _.isEmpty(group)) {
    const status = await ProjectGroupModel.updateOne( { _id: groupId, isDeleted: false }, { $set: groupInfo } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The group ${groupId} does not exist`);
  }
};

/**
 * Delete Project Group
 * @param {String} groupId
 */
const deleteProjectGroup = async (groupId) => {
  const group = await ProjectGroupModel.findOne( { _id: groupId, isDeleted: false } );
  if ( ! _.isEmpty(group) ) {
    const status = await ProjectGroupModel.updateOne( { _id: groupId, isDeleted: false }, { $set: { isDeleted: true } } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The group ${groupId} does not exist`);
  }
};

/**
 * Check if project group exists in db
 * @param {Object} groupId
 */
const findProjectGroup = async (groupId) => {
  const group = await ProjectGroupModel.findById(groupId);
  if (! _.isEmpty(group)) {
    return group;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The group ${groupId} does not exist`);
  }
};

/**
 * Add member to a project group
 * @param {String} memberId
 * @param {String} userId
 */
const addMember = async (memberId, userId) => {
  const member = await UserModel.findOne( { _id: memberId, isDeleted: false } );
  if ( ! _.isEmpty(member) ) {
    const memberProjectGroup = await ProjectGroupModel.findOne( { members: memberId, isDeleted: false } );
    if ( ! _.isEmpty(memberProjectGroup) ) {
      if (memberProjectGroup.members.length === 1) {
        deleteProjectGroup(memberProjectGroup._id);
      } else {
        await ProjectGroupModel.updateOne({ _id: memberProjectGroup._id, isDeleted: false }, { $pull: { members: memberId } } );
      }
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The member ${memberId} does not exist`);
  }

  const user = await UserModel.findOne( { _id: userId } );
  if ( ! _.isEmpty(user) ) {
    const userProjectGroup = await ProjectGroupModel.findOne( { members: userId, isDeleted: false });
    if ( ! _.isEmpty(userProjectGroup)) {
      await ProjectGroupModel.updateOne({ _id: userProjectGroup._id, isDeleted: false }, { $push: { members: memberId } });
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not belong to any group`);
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not exist`);
  }
};

/**
 * Remove Member from Project group
 * @param {String} userId
 */
const removeMember = async (userId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const userProjectGroup = await ProjectGroupModel.findOne( { members: userId, isDeleted: false } );
    if ( ! _.isEmpty(userProjectGroup) ) {
      if (userProjectGroup.members.length === 1) {
        deleteProjectGroup(userProjectGroup._id);
      } else {
        await ProjectGroupModel.updateOne({ _id: userProjectGroup._id, isDeleted: false }, { $pull: { members: userId } } );
      }
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not exist`);
  }
};

export default {
  createProjectGroup,
  getProjectGroups,
  updateProjectGroup,
  deleteProjectGroup,
  findProjectGroup,
  addMember,
  removeMember,
};
