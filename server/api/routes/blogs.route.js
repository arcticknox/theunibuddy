import express from 'express';
import blogController from '../controllers/blogs.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import blogValidations from '../validations/blogs.validations.js';

const router = express.Router();
const path = '/blog';

router.route('/')
    .post(
        requestValidatorMiddleware(blogValidations.createBlog),
        blogController.createBlog,
    )
    .get(
        blogController.getBlog,
    );


router.put(
    '/:blogId',
    requestValidatorMiddleware(blogValidations.updateBlog),
    blogController.updateBlog,
);


router.route('/:blogId').delete(
    blogController.deleteBlog,
);


export {
  router,
  path,
};
