import type { Response } from "express";

interface TResponse<T> {
    status: number,
    success: boolean,
    message: string,
    data?: T,
    error?: any
}

export const sendResponse = async<T>(res: Response, data: TResponse<T>) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data
    })
};