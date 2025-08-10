import { Types } from "mongoose";

export interface TResponse {
    question: Types.ObjectId;
    answer: string;
}

export interface IAssessments {
    _id?: string;
    userId: Types.ObjectId;
    responses: TResponse[];
    score?: number;
    certificateLevel?: string;
    startedAt: Date;
    completedAt: Date;
    timeExpired: boolean;
    nextStepEligible: boolean;
}