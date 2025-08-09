/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { setCookies } from "../../utils/setCookies";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { OtpServices } from "../otp/otp.service";



const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    setCookies(res, loginInfo);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: loginInfo
    })
});

// const getNewAccesssToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) {
//         throw new AppError(400, "Refresh token not found in cookies!");
//     }
//     const tokenInfo = await AuthServices.getNewAccesssToken(refreshToken);

//     setCookies(res, tokenInfo);

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "New access token generated successfully",
//         data: tokenInfo
//     })
// });

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null
    })
});

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { oldPassword, newPassword } = req.body;
    const decodedToken = req.user;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password has been changed successfully",
        data: null
    })
});

const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await OtpServices.resendOtp(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Otp has been send to your email!",
        data: null
    })
});

export const AuthController = {
    credentialsLogin,
    logout,
    resetPassword,
    forgetPassword
};