import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const userLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.userLoginFromDB(req.body);
        const { accessToken, refreshToken, user } = result;

        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            domain: "localhost"
        })

        sendResponse(res, {
            status: 200,
            success: true,
            message: "User logged in",
            data: {
                accessToken, user
            }
        })
    } catch (error: any) {
        sendResponse(res, {
            status: 500,
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const generateToken = async (req: Request, res: Response) => {
    try {
        const result = await authService.generateAccessToken(req.cookies.refreshToken);

        res.status(200).json({
            success: true,
            message: "Access Token generated successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

export const authController = {
    userLogin, generateToken
}
