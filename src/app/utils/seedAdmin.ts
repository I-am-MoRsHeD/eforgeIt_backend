import { envVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from 'bcryptjs';


export const seedAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL });

        if (isSuperAdminExist) {
            console.log('Super admin already exists!');
            return;
        };

        const authProviders: IAuthProvider = {
            provider: 'credentials',
            providerId: envVars.ADMIN_EMAIL
        };

        const bcryptedPassword = await bcrypt.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

        const payload: IUser = {
            name: "Super Admin",
            email: envVars.ADMIN_EMAIL,
            password: bcryptedPassword,
            role: Role.ADMIN,
            isVerified: true,
            auths: [authProviders]
        }
        const superAdmin = await User.create(payload);
        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }
}