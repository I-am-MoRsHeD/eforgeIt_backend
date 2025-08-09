import { Router } from "express";
import { Role } from "../user/user.interface";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.post('/login', AuthController.credentialsLogin);
// router.post('/refresh-token', AuthController.getNewAccesssToken);
router.post('/logout', AuthController.logout);
router.post('/reset-password', checkAuth(...Object.values(Role)), AuthController.resetPassword);
router.post('/forget-password', AuthController.forgetPassword);

export const authRoutes = router;