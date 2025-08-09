import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import bcrypt from 'bcryptjs';
import { Otp } from "./otp.model";
import { sendOtpEmail } from "../../utils/sendOtpEmail";


const verifyOtp = async (payload: { email: string, otp: string }) => {
    const { email, otp } = payload;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(400, 'User does not exist');
    };

    const existingOtp = await Otp.findOne({
        user: user._id,
        used: false,
        expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!existingOtp) {
        throw new AppError(400, 'Otp has expired or does not exist');
    }

    const isMatch = await bcrypt.compare(otp, existingOtp.otp);
    if (!isMatch) {
        throw new AppError(400, 'Incorrect otp');
    };

    // update otp to used
    existingOtp.used = true;
    await existingOtp.save();

    // update the otpVerified in user
    user.otpVerified = true;
    await user.save();

    return {};
};

const resendOtp = async (payload: { email: string }) => {
    const { email } = payload;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(400, 'User does not exist');
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save the OTP
    await Otp.create({
        user: user._id,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60000)
    });

    // Send email
    await sendOtpEmail(email as string, otp);

    return {};
};

export const OtpServices = {
    verifyOtp,
    resendOtp
}