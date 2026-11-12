import express from 'express';
import * as AuthController from '../controllers/Auth.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authRequired, AuthController.me);

export default router;
