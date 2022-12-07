import BlogModel from '../models/blogs.model.js';
import UserModel from '../models/user.model.js';
import _ from 'lodash';
import AppError from '../utils/AppError.js';
import httpStatus from 'http-status';

/**
 * Create blog
 * @param {Object} blogInfo
 */
const createBlog = async (blogInfo, userId) => {
  const user = await UserModel.findOne( { _id: userId, isDeleted: false } );
  if ( ! _.isEmpty(user) ) {
    blogInfo.user = user._doc.name;
    const newBlog = await new BlogModel(blogInfo);
    return newBlog.save();
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Error: The User doesnot exist');
  }
};


/**
 * Update blog
 * @param {String} blogId
 * @param {Object} blogInfo
 */
const updateBlog = async (blogId, blogInfo) => {
  const blog = await BlogModel.findById(blogId);
  if (! _.isEmpty(blog)) {
    const status = await BlogModel.updateOne( { _id: blogId, isDeleted: false }, { $set: blogInfo } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The room ${blogId} does not exist`);
  }
};

/**
 * Delete blog
 * @param {String} blogId
 */
const deleteBlog = async (blogId) => {
  const blog = await BlogModel.findOne( { _id: blogId, isDeleted: false } );
  if ( ! _.isEmpty(blog) ) {
    const status = await BlogModel.updateOne( { _id: blogId, isDeleted: false }, { $set: { isDeleted: true } } );
    return status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, `Error: The room ${blogId} does not exist`);
  }
};

export default {
  createBlog,
  updateBlog,
  deleteBlog,
};
