import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers)

export const userRoute = router;