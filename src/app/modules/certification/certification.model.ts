import { model, Schema } from "mongoose";
import { ICertification } from "./certification.interface";
import { TLevel } from "../questions/question.interface";


const certificateSchema = new Schema<ICertification>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    level: {
        type: String,
        enum: Object.values(TLevel),
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date,
        required: true
    },
    issuedAt: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Certificate = model<ICertification>('Certificate', certificateSchema);
