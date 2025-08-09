import { Types } from "mongoose"

export enum TLevel {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2'
};

export interface IQuestion {
    _id?: Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;
    competency: string;
    level: TLevel;
    createdBy?: string;
}