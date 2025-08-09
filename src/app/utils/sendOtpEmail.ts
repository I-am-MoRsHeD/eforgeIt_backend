import nodemailer from 'nodemailer';
import { envVars } from '../config/env';
import AppError from '../errorHelpers/AppError';

export const sendOtpEmail = async (toEmail: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envVars.MAIL_USER,
            pass: envVars.MAIL_PASS
        }
    });

    const mailOptions = {
        from: '"School Test Competition Verification Code" <noreply@testschool.local>',
        to: toEmail,
        subject: 'Your OTP Verification Code',
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; text-align: center;">
        <div style="max-width: 500px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: #4CAF50; padding: 15px;">
                <h1 style="color: white; margin: 0; font-size: 20px;">School Test Competition</h1>
            </div>
            <div style="padding: 20px;">
                <h2 style="color: #333;">Your OTP Code</h2>
                <p style="color: #555; font-size: 16px;">Use the code below to verify your account. This code will expire in <strong>10 minutes</strong>.</p>
                <div style="margin: 20px 0; font-size: 32px; font-weight: bold; color: #4CAF50; letter-spacing: 4px;">
                    ${otp}
                </div>
                <p style="font-size: 14px; color: #888;">If you did not request this code, please ignore this email.</p>
            </div>
            <div style="background: #f0f0f0; padding: 10px; font-size: 12px; color: #777;">
                &copy; ${new Date().getFullYear()} School Test Competition. All rights reserved.
            </div>
        </div>
    </div>
    `
    };


    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(' Failed to send email:', error);
        throw new AppError(404, 'Could not send email');
    }
};
