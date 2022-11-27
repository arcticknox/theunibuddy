import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    domains: Joi.array().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    organizationId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    domains: Joi.array().required(),
  }),
};

const deleteOrg = {
  params: Joi.object().keys({
    organizationId: Joi.string().required(),
  }),
};

export default {
  create,
  update,
  deleteOrg,
};
