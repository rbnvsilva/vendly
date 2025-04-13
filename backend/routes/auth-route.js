import express from 'express';
import { signIn, signOut, signUp, verifyEmail } from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/verify-email', verifyEmail);

export default router;
