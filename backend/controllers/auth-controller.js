import bcryptjs from 'bcryptjs';

import { User } from '../models/user-model.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateJWT } from '../utils/generateJWT.js';

export const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            verificationToken: generateVerificationToken().token,
            verificationTokenExpiresAt: generateVerificationToken().tokenExpiresAt
        });

        await user.save();

        generateJWT(res, user._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const signIn = async (req, res) => {
    res.send('signin route');
};

export const signOut = async (req, res) => {
    res.send('signout route');
};
