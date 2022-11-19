import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.loginWithEmail);
router.post('/logout', authMiddleware(), authController.logout);
router.post('/refresh-tokens', authMiddleware(), authController.refreshTokens);

export default router;
