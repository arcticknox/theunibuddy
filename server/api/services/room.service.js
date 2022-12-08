import RoomModel from '../models/room.model.js';
import UserModel from '../models/user.model.js';
import _ from 'lodash';
import AppError from '../utils/AppError.js';
import httpStatus from 'http-status';

/**
 * Create room
 * @param {Object} userInfo
 */
const createRoom = async (userInfo, userId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const room = await RoomModel.findOne( { members: userId, isDeleted: false } );
    if ( ! _.isEmpty(room) ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Error: User already has a room. Message: Please leave the exisiting room before creating a new one.');
    }
    userInfo.members = [userId];
    const newRoom = await new RoomModel(userInfo);
    return newRoom.save();
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Error: The User doesnot exist');
  }
};

/**
 * Get rooms
 */
const getRooms = async () => {
  const rooms = await RoomModel.find({ isDeleted: false });
  return rooms;
};

/**
 * Update Room
 * @param {String} memberId
 * @param {Object} roomInfo
 */
const updateRoom = async (memberId, roomInfo) => {
  const room = await RoomModel.findOne( { members: memberId, isDeleted: false } );
  if (! _.isEmpty(room)) {
    const status = await RoomModel.updateOne( { _id: room._id, isDeleted: false }, { $set: roomInfo } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The room for user ${memberId} does not exist`);
  }
};

/**
 * Delete Room
 * @param {String} roomId
 */
const deleteRoom = async (roomId) => {
  const room = await RoomModel.findOne( { _id: roomId, isDeleted: false } );
  if ( ! _.isEmpty(room) ) {
    const status = await RoomModel.updateOne( { _id: roomId, isDeleted: false }, { $set: { isDeleted: true } } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The room ${roomId} does not exist`);
  }
};

/**
 * Check if room exists in db
 * @param {Object} roomId
 */
const findRoom = async (roomId) => {
  const room = await RoomModel.findById(roomId);
  if (! _.isEmpty(room)) {
    return room;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The room ${roomId} does not exist`);
  }
};

/**
 * Check if room exists in db
 * @param {String} memberId
 * @param {String} userId
 */
const addMember = async (memberId, userId) => {
  const member = await UserModel.findOne( { _id: memberId, isDeleted: false } );
  if ( ! _.isEmpty(member) ) {
    const memberRoom = await RoomModel.findOne( { members: memberId, isDeleted: false } );
    if ( ! _.isEmpty(memberRoom) ) {
      if (memberRoom.members.length === 1) {
        deleteRoom(memberRoom._id);
      } else {
        await RoomModel.updateOne({ _id: memberRoom._id, isDeleted: false }, { $pull: { members: memberId } } );
      }
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The member ${memberId} does not exist`);
  }

  const user = await UserModel.findOne( { _id: userId } );
  if ( ! _.isEmpty(user) ) {
    const userRoom = await RoomModel.findOne( { members: userId, isDeleted: false });
    if ( ! _.isEmpty(userRoom)) {
      await RoomModel.updateOne({ _id: userRoom._id, isDeleted: false }, { $push: { members: memberId } });
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not belong to any room`);
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not exist`);
  }
};

/**
 * Check if room exists in db
 * @param {String} userId
 */
const removeMember = async (userId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    const userRoom = await RoomModel.findOne( { members: userId, isDeleted: false } );
    if ( ! _.isEmpty(userRoom) ) {
      if (userRoom.members.length === 1) {
        deleteRoom(userRoom._id);
      } else {
        await RoomModel.updateOne({ _id: userRoom._id, isDeleted: false }, { $pull: { members: userId } } );
      }
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The user ${userId} does not exist`);
  }
};

/**
 * Get all the listings
 * @param {String} userId
 */
const getListings = async (filter, pageNumber = 0, nPerPage = 10) => {
  const findBy = { isDeleted: false };
  if (!_.isEmpty(filter)) {
    filter = _.omitBy(filter, _.isEmpty);
    filter = _.omitBy(filter, (key, value)=> key === 'undefined');
    console.log(filter);
    const filterKeys = _.keys(filter);
    _.map(filterKeys, (key)=>{
      switch (key) {
        case 'rentBudgetLimit':
          findBy[key] = { $lt: filter[key] };
          break;
        default:
          findBy[key] = filter[key];
      }
    });
  }
  let listingData = [];
  const userList = await UserModel.find(findBy).sort({ _id: 1 }).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 ).limit( nPerPage );
  const total = userList.length;
  if (! _.isEmpty(userList)) {
    listingData = await Promise.all(
        userList.map(async (user)=>{
          const name = user._doc.name;
          const room = await RoomModel.findOne( { members: user._doc._id, isDeleted: false } );
          let desc = '';
          let maxCount = 0;
          let roommates = [];
          if (room !== null) {
            desc = room._doc.details;
            maxCount = room._doc.maxCount;
            roommates = await Promise.all(
                room._doc.members.map(async (user) =>{
                  const userObj = await UserModel.findOne( { _id: user, isDeleted: false } );
                  return [userObj._doc.name, userObj._doc._id];
                }),
            );
          }
          return ({
            userName: name,
            roomDesc: desc,
            maxCount: maxCount,
            members: [...roommates],
          });
        }),
    );
  }
  return {
    listingData: listingData.length ? listingData : [],
    pageNumber,
    nPerPage,
    total,
  };
};

const getUserRoom = async (userId) => {
  const userData = await UserModel.find({ _id: userId, isDeleted: false });
  if (! _.isEmpty(userData)) {
    const listingData = await Promise.all(
        userData.map(async (user)=>{
          const name = user._doc.name;
          const room = await RoomModel.findOne( { members: user._doc._id, isDeleted: false } );
          let desc = '';
          let maxCount = 0;
          let roommates = [];
          if (room !== null) {
            desc = room._doc.details;
            maxCount = room._doc.maxCount;
            roommates = await Promise.all(
                room._doc.members.map(async (user) =>{
                  const userObj = await UserModel.findOne( { _id: user, isDeleted: false } );
                  return [userObj._doc.name, userObj._doc._id];
                }),
            );
          }
          return ({
            userName: name,
            roomDesc: desc,
            maxCount: maxCount,
            members: [...roommates],
          });
        }),
    );
    return listingData;
  }
};

export default {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  findRoom,
  addMember,
  removeMember,
  getListings,
  getUserRoom,
};
