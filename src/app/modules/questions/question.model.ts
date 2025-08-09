import { model, Schema } from "mongoose";
import { IQuestion } from "./question.interface";
import { Competency } from "../../interface/globalTypes";


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
        default: 'Admin'
    },
}, {
    versionKey: false,
    timestamps: true
});

export const Question = model<IQuestion>("Question", questionSchema);