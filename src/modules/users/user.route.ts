import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers)
router.get("/:id", userController.getUser)

export const userRoute = router;