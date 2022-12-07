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
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User does not exist`);
  }
};

/**
 * Get room invites
 */
const getAllRecievedInvites = async (userId, type) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const invites = await InviteModel.find({ rUserID: userId, type, isDeleted: false, status: 'pending' });
    const invitesResponse = await Promise.all(invites.map(async (invite) => {
      const sUser = await UserModel.findOne({ _id: _.get(invite, 'sUserID'), isDeleted: false });
      return {
        _id: _.get(invite, '_id'),
        name: _.get(sUser, 'name'),
        universityName: _.get(sUser, 'universityName'),
        sUserID: _.get(sUser, '_id'),
        type: _.get(invite, 'type'),
        status: _.get(invite, 'status'),
        createdAt: _.get(invite, 'createdAt'),
        updatedAt: _.get(invite, 'updatedAt'),
      };
    }));
    return invitesResponse;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User does not exist`);
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
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The recieving User does not exist`);
  }
};

/**
 * Accept an invite
 */
const acceptInvite = async (userId, inviteId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const status = await InviteModel.findByIdAndUpdate({ _id: inviteId, rUserID: userId, isDeleted: false }, { $set: { status: 'accepted' } }, { new: true });
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User does not exist`);
  }
};

/**
 * Reject an invite
 */
const rejectInvite = async (userId, inviteId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const status = await InviteModel.findOneAndUpdate({ _id: inviteId, rUserID: userId, isDeleted: false }, { $set: { status: 'rejected' } }, { new: true });
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User does not exist`);
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
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The User does not exist`);
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
