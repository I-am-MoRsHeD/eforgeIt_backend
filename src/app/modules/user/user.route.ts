import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
import { validateSchema } from "../../middleware/validateSchema";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

const router = Router();

router.post('/register', validateSchema(createUserZodSchema), UserController.createUser);
router.get('/', checkAuth(Role.ADMIN), UserController.getAllUser);
router.patch('/update-user', checkAuth(Role.ADMIN), validateSchema(updateUserZodSchema) ,UserController.updateUser);

export const userRoutes = router;