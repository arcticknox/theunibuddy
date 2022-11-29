import express from 'express';
import adminController from '../controllers/admin.controller.js';
import adminAuthMiddleware from '../middlewares/admin.middleware.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import adminValidations from '../validations/admin.validations.js';

const router = express.Router();
const path = '/admin';

router.route('/organization')
    .get(adminAuthMiddleware(), adminController.get)
    .post(requestValidatorMiddleware(adminValidations.create),
        adminAuthMiddleware(), adminController.create);

router.route('/organization/:organizationId')
    .put(requestValidatorMiddleware(adminValidations.update),
        adminAuthMiddleware(), adminController.update)
    .delete(requestValidatorMiddleware(adminValidations.deleteOrg),
        adminAuthMiddleware(), adminController.deleteOrg);

export {
  router,
  path,
};

