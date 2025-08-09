import { Router } from "express";
import { QuestionController } from "./question.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validateSchema } from "../../middleware/validateSchema";
import { createQuestionZodSchema } from "./question.validation";

const router = Router();

router.post('/create-question', checkAuth(Role.ADMIN), validateSchema(createQuestionZodSchema), QuestionController.createQuestions);
router.get('/', QuestionController.getAllQuestions);

export const questionRoutes = router;