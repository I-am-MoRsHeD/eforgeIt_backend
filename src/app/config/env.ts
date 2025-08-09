import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    PORT: string;
    DB_URL: string;
    NODE_ENV: 'development' | 'production';
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    BCRYPT_SALT_ROUNDS: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    FRONTEND_URL: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    // EXPRESS_SESSION_SECRET: string;
};

const requiredEnvVariables: string[] = ['PORT', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'JWT_REFRESH_SECRET', 'JWT_REFRESH_EXPIRES', 'BCRYPT_SALT_ROUNDS', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'FRONTEND_URL', 'MAIL_USER', 'MAIL_PASS'];

const loadEnvVariables = (): EnvVars => {
    requiredEnvVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable ${envVar}`);
        };
    });
    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        MAIL_USER: process.env.MAIL_USER as string,
        MAIL_PASS: process.env.MAIL_PASS as string,
        // EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    };
}

export const envVars = loadEnvVariables()