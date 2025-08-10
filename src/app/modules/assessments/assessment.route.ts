import { Router } from "express";
import { AssessmentController } from "./assessment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post('/create-assessment', checkAuth(Role.USER), AssessmentController.createAssessment);

export const assessmentRoutes = router;