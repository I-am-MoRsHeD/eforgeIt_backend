import { Types } from "mongoose";


export interface IOtp {
    user: Types.ObjectId;
    otp: string;
    expiresAt: Date;
    used: boolean;
}