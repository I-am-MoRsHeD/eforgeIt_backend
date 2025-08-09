import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { sendOtpEmail } from "../../utils/sendOtpEmail";
import { Otp } from "../otp/otp.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs';


const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(400, 'User already exists');
    };

    const bcryptedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUNDS));

    const user = await User.create({
        email,
        password: bcryptedPassword,
        ...rest,
    });

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

    return user;
};

const getAllUser = async () => {
    const users = await User.find();
    return users;
};

const updateUser = async (payload: Partial<IUser>) => {
    const { _id: userId } = payload;

    if (payload.otpVerified) {
        throw new AppError(404, "this cannot be updated!");
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdatedUser;
}

export const UserServices = {
    createUser,
    getAllUser,
    updateUser
};