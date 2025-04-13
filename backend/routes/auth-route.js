import express from 'express';
import { signUp, signIn, signOut, verifyEmail } from '../services/auth-service.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/verify-email', verifyEmail);

export default router;
