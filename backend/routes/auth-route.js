import express from 'express';
import { signIn, signOut, signUp } from '../controllers/auth-controller.js';

const router = express.Router();

router.get('/signup', signUp);

router.get('/signin', signIn);

router.get('/signout', signOut);

export default router;
