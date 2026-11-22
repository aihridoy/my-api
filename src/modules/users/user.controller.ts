import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserToDB(req.body);

        sendResponse(res, {
            status: 201,
            success: true,
            message: "User created",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
        sendResponse(res, {
            status: 500,
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUsersFromDB();
        console.log(result)
        sendResponse(res, {
            status: 200,
            success: true,
            message: "Users retrieved",
            data: result.rows
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

export const userController = {
    createUser, getUsers
}