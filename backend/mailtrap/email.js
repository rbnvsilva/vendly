import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
} from './email-templates.js';

import { mailtrapClient, sender } from './config.js';

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: 'Email Verification'
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: 'cdfe87f8-578d-4b0d-91f6-c4f130240b47',
            template_variables: {
                company_info_name: 'Vendly'
            }
        });

        console.log('Welcome email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
            category: 'Password Reset'
        });

        console.log('Reset Password email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async email => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        });

        console.log('Password reset email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
