import Joi from 'joi';

const getAllSentInvites = {
  body: Joi.object().keys({
    sUserID: Joi.string().allow(null, ''),
    rUserID: Joi.string().allow(null, ''),
    type: Joi.string().required(),
  }),
};

const getAllRecievedInvites = {
  body: Joi.object().keys({
    sUserID: Joi.string().allow(null, ''),
    rUserID: Joi.string().allow(null, ''),
    type: Joi.string().required(),
  }),
};

const sendInvite = {
  body: Joi.object().keys({
    sUserID: Joi.string().allow(null, ''),
    rUserID: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

const acceptInvite = {
  params: Joi.object().keys({
    inviteId: Joi.string().required(),
  }),
};

const rejectInvite = {
  params: Joi.object().keys({
    inviteId: Joi.string().required(),
  }),
};

const deleteInvite = {
  params: Joi.object().keys({
    inviteId: Joi.string().required(),
  }),
};

export default {
  getAllSentInvites,
  getAllRecievedInvites,
  sendInvite,
  acceptInvite,
  rejectInvite,
  deleteInvite,
};
