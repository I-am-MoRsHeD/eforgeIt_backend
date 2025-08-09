import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { otpRoutes } from "../modules/otp/otp.route";
import { questionRoutes } from "../modules/questions/question.route";


export const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/otp',
        route: otpRoutes
    },
    {
        path: '/questions',
        route: questionRoutes
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})