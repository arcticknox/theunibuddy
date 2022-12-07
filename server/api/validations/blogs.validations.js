import Joi from 'joi';

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userName: Joi.string().required(),
  }),
};


const updateBlog = {
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    userName: Joi.string(),
  }),
};


export default {
  createBlog,
  updateBlog,
};
