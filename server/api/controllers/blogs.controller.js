import BlogService from '../services/blogs.service.js';
import responseHandler from '../utils/responseHandler.js';
import catchAsync from '../utils/catchAsync.js';


/**
 * Create New blog
 * @param {Object} req
 * @param {Object} res
 */
const createBlog = catchAsync(async (req, res) => {
  const { body } = req;
  const blog = await BlogService.createBlog(body, req.user._id);
  responseHandler(res, { blog });
});

/**
 * Get all the Blogs
 * @param {Object} req
 * @param {Object} res
 */
const getBlog = catchAsync(async (req, res) => {
  const blogs = await BlogService.getBlogs();
  responseHandler(res, { blogs });
});

/**
 * Update the blog
 * @param {Object} req
 * @param {Object} res
 */
const updateBlog = catchAsync(async (req, res) => {
  const { body } = req;
  const blog = await BlogService.update(req.params.blogId, body);
  responseHandler(res, { blog });
});

/**
 * Delete the blog
 * @param {Object} req
 * @param {Object} res
 */
const deleteBlog = catchAsync(async (req, res) => {
  const status = await BlogService.deleteBlog(req.params.blogId);
  responseHandler(res, { status });
});

export default {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
