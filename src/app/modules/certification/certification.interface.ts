import { Types } from "mongoose";
import { TLevel } from "../questions/question.interface";



export interface ICertification {
    _id?: string;
    userId: Types.ObjectId;
    level: TLevel;
    score: number;
    startedAt: Date;
    completedAt: Date;
    issuedAt: Date;
};
