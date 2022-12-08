import RoomService from '../services/room.service.js';
import responseHandler from '../utils/responseHandler.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Create New Room
 * @param {Object} req
 * @param {Object} res
 */
const createRoom = catchAsync(async (req, res) => {
  const { body } = req;
  const room = await RoomService.createRoom(body, req.user._id);
  responseHandler(res, { room });
});

/**
 * Get all the rooms
 * @param {Object} req
 * @param {Object} res
 */
const getRooms = catchAsync(async (req, res) => {
  const status = await RoomService.getRooms();
  responseHandler(res, { status });
});

/**
 * Update the room information
 * @param {Object} req
 * @param {Object} res
 */
const updateRoom = catchAsync(async (req, res) => {
  const { body } = req;
  const room = await RoomService.updateRoom(req.user._id, body);
  responseHandler(res, { room });
});

/**
 * Delete the room
 * @param {Object} req
 * @param {Object} res
 */
const deleteRoom = catchAsync(async (req, res) => {
  const status = await RoomService.deleteRoom(req.params.roomId);
  responseHandler(res, { status });
});

/**
 * Add a member to the room
 * @param {Object} req
 * @param {Object} res
 */
const addMember = catchAsync(async (req, res) => {
  const status = await RoomService.addMember(req.body.members[0], req.user._id);
  responseHandler(res, { status });
});

/**
 * Remove member from the room
 * @param {Object} req
 * @param {Object} res
 */
const removeMember = catchAsync( async (req, res) => {
  const status = await RoomService.removeMember(req.user._id);
  responseHandler(res, { status });
});

/**
 * Get all the listings
 * @param {Object} req
 * @param {Object} res
 */
const getListings = catchAsync(async (req, res) => {
  const filter = req.query;
  delete filter.pageNumber;
  delete filter.nPerPage;
  const listingInfo = await RoomService.getListings(filter, req.query.pageNumber, req.query.nPerPage);
  responseHandler(res, listingInfo);
});

/**
 * Get the user room
 * @param {Object} req
 * @param {Object} res
 */
const getUserRoom = catchAsync(async (req, res) => {
  const userRoom = await RoomService.getUserRoom(req.user._id);
  responseHandler(res, { userRoom });
});

const getUserRoomId = catchAsync( async (req, res) => {
  const userRoom = await RoomService.getUserRoom(req.params.Id);
  responseHandler(res, { userRoom });
});

const kickMember = catchAsync( async (req, res) => {
  const status = await RoomService.removeMember(req.params.Id);
  responseHandler(res, { status });
});

export default {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  addMember,
  removeMember,
  getListings,
  getUserRoom,
  getUserRoomId,
  kickMember,
};
