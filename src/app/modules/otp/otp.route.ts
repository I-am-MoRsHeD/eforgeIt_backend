import { Router } from "express";
import { OtpController } from "./otp.controller";


const router = Router();

router.post('/verify-otp', OtpController.verifyOtp);
router.post('/resend-otp', OtpController.resendOtp);

export const otpRoutes = router;