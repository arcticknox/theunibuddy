import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
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
    authMiddleware(),
    authController.logout,
);
router.post(
    '/refresh-tokens',
    requestValidatorMiddleware(authValidations.refreshTokens),
    authMiddleware(),
    authController.refreshTokens,
);
router.get('/verify-email', authController.verifyUserEmail);

router.post('/password-reset', authController.passwordReset);

router.get('/verify-password-reset', authController.verifyPasswordReset);

export {
  router,
  path,
};
