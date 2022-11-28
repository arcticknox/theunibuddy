import Joi from 'joi';

const createRoom = {
  body: Joi.object().keys({
    members: Joi.array().required(),
    details: Joi.string().required(),
    maxCount: Joi.number().required(),
  }),
};


const updateRoom = {
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


export default {
  createRoom,
  updateRoom,
  addMember,
};
