export const generateVerificationToken = () => {
    return {
        token: Math.floor(100000 + Math.random() * 900000).toString(),
        tokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
};
