import type { Request, Response } from "express";
import { profileService } from "./profile.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);
        sendResponse(res, {
            status: 201,
            success: true,
            message: "Profile created",
            data: result.rows[0]
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

export const profileController = {
    createProfile
}