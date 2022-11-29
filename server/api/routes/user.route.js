import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import userValidations from '../validations/user.validations.js';

const router = express.Router();
const path = '/user';

router.route('/:userId')
    .get([requestValidatorMiddleware(userValidations.fetchById), authMiddleware()], userController.fetchById)
    .put([requestValidatorMiddleware(userValidations.update), authMiddleware()], userController.updateUser)
    .delete([requestValidatorMiddleware(userValidations.remove), authMiddleware()], userController.deleteUser);

export {
  router,
  path,
};
