import InviteModel from '../models/invite.model.js';
import UserModel from '../models/user.model.js';
import _ from 'lodash';
import AppError from '../utils/AppError.js';
import httpStatus from 'http-status';

/**
 * Get project invites
 */
const getAllSentInvites = async (userId, body) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const invites = await InviteModel.find({ sUserID: userId, type: body.type, isDeleted: false });
    return invites;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User ${userId} doesnot exist`);
  }
};

/**
 * Get room invites
 */
const getAllRecievedInvites = async (userId, body) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const invites = await InviteModel.find({ rUserID: userId, type: body.type, isDeleted: false });
    return invites;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User ${userId} doesnot exist`);
  }
};

/**
 * Send an invite
 */
const sendInvite = async (userId, inviteInfo) => {
  const user = await UserModel.findOne( { _id: inviteInfo.rUserID, isDeleted: false } );
  const checkInvite = await InviteModel.find({ sUserID: userId, rUserID: inviteInfo.rUserID, type: inviteInfo.type, isDeleted: false });

  if (! _.isEmpty(checkInvite)) {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The invite already exists ${checkInvite._id}`);
  }

  if ( ! _.isEmpty(user) ) {
    inviteInfo.sUserID = userId;
    const newInvite = await new InviteModel(inviteInfo);
    return newInvite.save();
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The recieving User ${userId} doesnot exist`);
  }
};

/**
 * Accept an invite
 */
const acceptInvite = async (userId, inviteId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const status = await InviteModel.updateOne({ _id: inviteId, rUserID: userId, isDeleted: false }, { $set: { status: 'accepted' } });
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User ${userId} doesnot exist`);
  }
};

/**
 * Reject an invite
 */
const rejectInvite = async (userId, inviteId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const status = await InviteModel.updateOne({ _id: inviteId, rUserID: userId, isDeleted: false }, { $set: { status: 'rejected' } });
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User ${userId} doesnot exist`);
  }
};

/**
 * Cancel an invite
 */
const deleteInvite = async (userId, inviteId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const status = await InviteModel.updateOne({ _id: inviteId, sUserId: userId, isDeleted: false }, { $set: { isDeleted: true } });
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User ${userId} doesnot exist`);
  }
};

export default {
  getAllSentInvites,
  getAllRecievedInvites,
  sendInvite,
  acceptInvite,
  rejectInvite,
  deleteInvite,
};
