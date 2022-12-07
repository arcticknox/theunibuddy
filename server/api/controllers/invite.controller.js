import InviteService from '../services/invite.service.js';
import responseHandler from '../utils/responseHandler.js';
import catchAsync from '../utils/catchAsync.js';


const getAllSentInvites = catchAsync(async (req, res) => {
  const { body } = req;
  const invites = await InviteService.getAllSentInvites(req.user._id, body);
  responseHandler(res, { invites });
});

const getAllRecievedInvites = catchAsync(async (req, res) => {
  const { params: { type } } = req;
  const invites = await InviteService.getAllRecievedInvites(req.user._id, type);
  responseHandler(res, { invites });
});

const sendInvite = catchAsync(async (req, res) => {
  const { body } = req;
  const status = await InviteService.sendInvite(req.user, body);
  responseHandler(res, { status });
});

const acceptInvite = catchAsync(async (req, res) => {
  const status = await InviteService.acceptInvite(req.user._id, req.params.inviteId);
  responseHandler(res, { status });
});

const rejectInvite = catchAsync(async (req, res) => {
  const status = await InviteService.rejectInvite(req.user._id, req.params.inviteId);
  responseHandler(res, { status } );
});

const deleteInvite = catchAsync(async (req, res) => {
  const status = await InviteService.deleteInvite(req.user._id, req.params.inviteId);
  responseHandler(res, { status } );
});

export default {
  getAllSentInvites,
  getAllRecievedInvites,
  sendInvite,
  acceptInvite,
  rejectInvite,
  deleteInvite,
};
