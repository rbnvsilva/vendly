import bcryptjs from 'bcryptjs';

import { User } from '../models/user-model.js';
import { generateVerificationToken, setJWTCookie } from '../helpers/auth-helper.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../services/mailtrap-service.js';

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

        setJWTCookie(res, user._id);

        await sendVerificationEmail(user.email, user.verificationToken);

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        setJWTCookie(res, user._id);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const signOut = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Signed out successfully' });
};

export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: verificationToken,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid or expired verification code' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
