import Joi from 'joi';

const fetchById = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    gender: Joi.string(),
    mobile: Joi.string(),
    rentBudgetLimit: Joi.number(),
    dietaryPreference: Joi.string(),
    roommateGenderPreference: Joi.string(),
    moveInDate: Joi.date(),
    country: Joi.string(),
    dob: Joi.date(),
    program: Joi.string(),
    intake: Joi.string(),
    studyLevel: Joi.string(),
    contactPreference: Joi.string(),
    linkedIn: Joi.string(),
  }),
};

const remove = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

export default {
  fetchById,
  update,
  remove,
};
