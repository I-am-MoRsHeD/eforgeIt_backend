import { Types } from "mongoose";
import { TLevel } from "../questions/question.interface";



export interface ICertification {
    _id?: string;
    userId: Types.ObjectId;
    level: TLevel;
    score: number;
    startedAt: string;
    completedAt: string;
    issuedAt: Date;
};
