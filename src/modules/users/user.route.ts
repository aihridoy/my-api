import { Router } from "express";
import { userController } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLE } from "../../types/index.js";

const router = Router();

const { admin, user, manager } = USER_ROLE;

router.post("/", userController.createUser);
router.get("/", userController.getUsers)
router.get("/:id", userController.getUser)
router.put("/:id", auth(admin, user, manager), userController.updateUser)
router.delete("/:id", userController.deleteUser)

export const userRoute = router;