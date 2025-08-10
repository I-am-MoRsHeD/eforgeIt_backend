import { model, Schema } from "mongoose";
import { IQuestion } from "./question.interface";
import { Competency } from "../../interface/globalTypes";
import { Role } from "../user/user.interface";


const questionSchema = new Schema<IQuestion>({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    competency: {
        type: String,
        enum: Object.values(Competency),
        required: true
    },
    level: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
        default: Role.ADMIN
    },
}, {
    versionKey: false,
    timestamps: true
});

export const Question = model<IQuestion>("Question", questionSchema);