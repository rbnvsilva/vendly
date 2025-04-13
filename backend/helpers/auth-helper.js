import jwt from 'jsonwebtoken';

export const generateVerificationToken = () => {
    return {
        token: Math.floor(100000 + Math.random() * 900000).toString(),
        tokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
};

export const setJWTCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};
