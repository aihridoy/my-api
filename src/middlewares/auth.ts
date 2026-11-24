import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Role } from "../types/index.js";
import { pool } from "../db/index.js";
import { sendResponse } from "../utils/sendResponse.js";

export const auth = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                sendResponse(res, {
                    status: 401,
                    success: false,
                    message: "Unauthorize",
                })
                return;
            }
            const decode = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
            const user = await pool.query(`
                SELECT * FROM users WHERE email=$1
                `, [decode.email])

            if (user.rowCount === 0) {
                sendResponse(res, {
                    status: 404,
                    success: false,
                    message: "User not found"
                })
                return;
            }

            if (!user.rows[0].is_active) {
                sendResponse(res, {
                    status: 403,
                    success: false,
                    message: "User forbidden"
                })
                return;
            }

            if (roles.length && !roles.includes(user.rows[0].role)) {
                sendResponse(res, {
                    status: 401,
                    success: false,
                    message: "Unauthorize"
                })
                return;
            }

            req.user = decode;

            next();


        } catch (error) {
            next(error);
        }
    }
}
