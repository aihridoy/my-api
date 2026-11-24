import express, { type Application, type Request, type Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { userRoute } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRoute } from "./modules/auth/auth.route.js";

export const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "John"
    });
})