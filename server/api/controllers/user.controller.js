import catchAsync from '../utils/catchAsync.js';
import userService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

const fetchById = catchAsync(async (req, res) => {
  const _id = req.params.userId;
  const userInfo = await userService.fetchUserById(_id);
  responseHandler(res, userInfo);
});

const updateUser = catchAsync(async (req, res) => {
  const _id = req.params.userId;
  const userInfo = req.body;
  const updatedUserInfo = await userService.updateUser(_id, userInfo);
  responseHandler(res, updatedUserInfo);
});

const deleteUser = catchAsync(async (req, res) => {
  const _id = req.params.userId;
  await userService.deleteUser(_id);
  responseHandler(res);
});

export default {
  fetchById,
  updateUser,
  deleteUser,
};
