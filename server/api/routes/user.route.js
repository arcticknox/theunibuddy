import express from 'express';
import userController from '../controllers/user.controller.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import userValidations from '../validations/user.validations.js';

const router = express.Router();
const path = '/user';

router.route('/:userId')
    .get(requestValidatorMiddleware(userValidations.fetchById), userController.fetchById)
    .put(requestValidatorMiddleware(userValidations.update), userController.updateUser)
    .delete(requestValidatorMiddleware(userValidations.remove), userController.deleteUser);

export {
  router,
  path,
};
