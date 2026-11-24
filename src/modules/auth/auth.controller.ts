import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const userLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.userLoginFromDB(req.body);
        sendResponse(res, {
            status: 200,
            success: true,
            message: "User logged in",
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            status: 500,
            success: true,
            message: error?.message,
            data: error
        })
    }
}

export const authController = {
    userLogin
}