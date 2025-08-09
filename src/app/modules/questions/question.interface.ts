import { Types } from "mongoose"


export interface IQuestion {
    _id?: Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;
    competency: string;
    level: string;
    createdBy?: string;
}