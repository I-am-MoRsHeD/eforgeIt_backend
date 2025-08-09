/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OtpServices } from "./otp.service";



const verifyOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await OtpServices.verifyOtp(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Otp verified successfully! Please login to access your account",
        data: {}
    })
});

const resendOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await OtpServices.resendOtp(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Otp has been send to your email!",
        data: {}
    })
});

export const OtpController = {
    verifyOtp,
    resendOtp
}