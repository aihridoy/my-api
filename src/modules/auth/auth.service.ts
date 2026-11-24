import bcrypt from 'bcrypt';
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

    return user;
}

export const authService = {
    userLoginFromDB
}
