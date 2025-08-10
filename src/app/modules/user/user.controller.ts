/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IUser } from "./user.interface";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "OTP sent to email. Please verify.",
        data: user
    });
});

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUser();
    sendResponse<IUser[]>(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: users
    });
});

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await UserServices.updateUser(payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: user
    });
});

export const UserController = {
    createUser,
    getAllUser,
    updateUser
}