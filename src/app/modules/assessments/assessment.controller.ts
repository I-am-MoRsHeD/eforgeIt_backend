/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AssessmentServices } from "./assessment.service";
import { sendResponse } from "../../utils/sendResponse";


const createAssessment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedUser = req.user;
    const { step } = req.query;
    const assessment = await AssessmentServices.createAssessment(req.body, Number(step), decodedUser?.userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Assessment completed successfully!",
        data: assessment
    });
});

export const AssessmentController = {
    createAssessment
};