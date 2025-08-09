import { model, Schema } from 'mongoose';
import { IOtp } from './otp.interface';

const otpSchema = new Schema<IOtp>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
});

export const Otp = model<IOtp>('Otp', otpSchema);
