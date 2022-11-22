import httpStatus from 'http-status';
import Joi from 'joi';
import _ from 'lodash';
import responseHandler from '../utils/responseHandler.js';

/**
 * Validate request object
 * @param {Object} schema
 * @returns
 */
const requestValidatorMiddleware = (schema) => (req, res, next) => {
  const reqSchema = _.pick(schema, ['body', 'params', 'query']);
  const requestObject = _.pick(req, _.keys(reqSchema));
  const {value, error} = Joi.compile(reqSchema).validate(requestObject);
  if (error) {
    const message = error.details.map((detail) => detail.message);
    return next(responseHandler(res, message, httpStatus.BAD_REQUEST));
  }
  Object.assign(req, value); // Replace with validated object
  return next();
};

export default requestValidatorMiddleware;
