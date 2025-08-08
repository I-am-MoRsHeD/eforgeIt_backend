import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    SUPER_VISOR = "SUPER_VISOR"
};

export enum Active {
    ACTIVE = "ACTIVE",
    BLOCKED = 'BLOCKED'
};

export interface IUser {
    _id?: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: Role;
    isDeleted: boolean;
    isActive: Active;
    otpVerified?: boolean;
};