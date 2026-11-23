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

        sendResponse(res, {
            status: 200,
            success: true,
            message: "Users retrieved",
            data: result.rows
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

const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserFromDB(id as string);

        if (result.rowCount === 0) {
            return sendResponse(res, {
                status: 404,
                success: false,
                message: "User not found"
            })
        }
        sendResponse(res, {
            status: 200,
            success: true,
            message: "User retrieved",
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.updateUserFromDB(req.body, id as string)
        sendResponse(res, {
            status: 201,
            success: true,
            message: "User updated",
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

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserFromDB(id as string);

        if (result.rowCount === 0) {
            return sendResponse(res, {
                status: 404,
                success: false,
                message: "User not found"
            })
        }

        sendResponse(res, {
            status: 200,
            success: true,
            message: "User deleted"
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

export const userController = {
    createUser, getUsers, getUser, updateUser, deleteUser
}
