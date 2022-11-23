import express from 'express';
import adminController from '../controllers/admin.controller.js';
import adminAuthMiddleware from '../middlewares/admin.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import adminValidations from '../validations/admin.validations.js';

const router = express.Router();

router.route('/organization')
    .get([authMiddleware(), adminAuthMiddleware()], adminController.get)
    .post(requestValidatorMiddleware(adminValidations.create),
        [authMiddleware(), adminAuthMiddleware()], adminController.create);

router.route('organization/:organizationId')
    .put(requestValidatorMiddleware(adminValidations.update),
        [authMiddleware(), adminAuthMiddleware()], adminController.update)
    .delete(requestValidatorMiddleware(adminValidations.deleteOrg),
        [authMiddleware(), adminAuthMiddleware()], adminController.deleteOrg);

export default router;
