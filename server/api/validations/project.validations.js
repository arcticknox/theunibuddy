import Joi from 'joi';

const createProjectGroup = {
  body: Joi.object().keys({
    members: Joi.array().required(),
    details: Joi.string().required(),
    maxCount: Joi.number().required(),
  }),
};

const updateProjectGroup = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    details: Joi.string(),
    maxCount: Joi.number(),
  }),
};

const addMember = {
  body: Joi.object().keys({
    members: Joi.array(),
  }),
};

const deleteProjectGroup = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
};

export default {
  createProjectGroup,
  updateProjectGroup,
  addMember,
  deleteProjectGroup,
};
