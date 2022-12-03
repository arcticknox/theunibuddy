import express from 'express';
import authController from '../controllers/auth.controller.js';

import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import authValidations from '../validations/auth.validations.js';

const router = express.Router();
const path = '/auth';

router.post(
    '/register',
    requestValidatorMiddleware(authValidations.register),
    authController.register,
);
router.post(
    '/login',
    requestValidatorMiddleware(authValidations.login),
    authController.loginWithEmail,
);
router.post(
    '/logout',
    requestValidatorMiddleware(authValidations.logout),
    authController.logout,
);
router.post(
    '/refresh-tokens',
    requestValidatorMiddleware(authValidations.refreshTokens),
    authController.refreshTokens,
);
router.get('/verify-email', authController.verifyUserEmail);

router.post('/password-reset', authController.passwordReset);

router.put('/verify-password-reset', authController.verifyPasswordReset);

export {
  router,
  path,
};
