import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../../db/index.js";

const userLoginFromDB = async (payload: any) => {
    const { email, password } = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

    if (user.rowCount === 0) {
        throw new Error("Invalid credentials")
    }

    const matchPass = await bcrypt.compare(password, user.rows[0].password);

    if (!matchPass) {
        throw new Error("Invalid credentials");
    }

    if (!user.rows[0].is_active) {
        throw new Error("Access denied");
    }

    delete user.rows[0].password;

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    const refreshToken = jwt.sign(jwtPayload, process.env.JWT_REFRESH as string, { expiresIn: "10d" });

    return {
        accessToken, refreshToken, user: user.rows[0]
    };
}

const generateAccessToken = async (token: string) => {
    if (!token) {
        throw new Error("Unauthorized");
    }

    const decode = jwt.verify(token, process.env.JWT_REFRESH as string) as JwtPayload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decode.email]);

    if (user.rowCount === 0) {
        throw new Error("User not found")
    }

    if (!user.rows[0].is_active) {
        throw new Error("User forbidden")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    return { accessToken };
}

export const authService = {
    userLoginFromDB, generateAccessToken
}
