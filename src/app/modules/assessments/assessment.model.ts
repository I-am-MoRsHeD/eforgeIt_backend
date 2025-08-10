import { model, Schema } from "mongoose";
import { IAssessments, TResponse } from "./assessment.interface";

const responseSchema = new Schema<TResponse>({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer: {
        type: String,
        required: true,
        default: null
    }
}, {
    versionKey: false,
    _id: false,
    timestamps: false
});

const assessmentSchema = new Schema<IAssessments>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responses: {
        type: [responseSchema],
        required: true
    },
    score: {
        type: Number,
    },
    certificateLevel: {
        type: String,
    },
    startedAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date,
        required: true
    },
    timeExpired: {
        type: Boolean,
        required: true
    },
    nextStepEligible: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Assessment = model<IAssessments>('Assessment', assessmentSchema);