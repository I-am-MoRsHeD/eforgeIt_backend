/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IQuestion } from "./question.interface";
import { QuestionServices } from "./question.service";


const createQuestions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questions = await QuestionServices.createQuestions(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Question created successfully!",
        data: {}
    });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questions = await QuestionServices.getAllQuestions();
    sendResponse<IQuestion[]>(res, {
        statusCode: 200,
        success: true,
        message: "Questions retrieved successfully",
        data: questions
    });
});

export const QuestionController = {
    createQuestions,
    getAllQuestions
};