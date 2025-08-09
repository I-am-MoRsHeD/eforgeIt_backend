import { envVars } from "../config/env"
import bcrypt from 'bcryptjs';
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";


export const seedAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL });

        if (isAdminExist) {
            console.log('Admin already exists!');
            return;
        };

        const bcryptedPassword = await bcrypt.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

        const payload: Partial<IUser> = {
            fullName: "Admin",
            email: envVars.ADMIN_EMAIL,
            password: bcryptedPassword,
            role: Role.ADMIN
        }
        const admin = await User.create(payload);
        console.log(admin);
    } catch (error) {
        console.log(error);
    }
}