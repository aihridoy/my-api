import { pool } from "../../db/index.js";
import type { IUser } from "./user.interface.js";

const createUserToDB = async (payload: IUser) => {
    const { name, email, password, role, age } = payload;
    const user = await pool.query(`
        INSERT INTO users (name, email, password, age, role) VALUES
        ($1,$2,$3,$4,$5) RETURNING *
        `, [name, email, password, age, role]);

    delete user.rows[0].password;

    return user;
}

const getUsersFromDB = async () => {
    return await pool.query(`
        SELECT * FROM users;
        `)
}

const getUserFromDB = async (id: string) => {
    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id]);

    // if (user.rowCount === 0) {
    //     throw new Error("User not found")
    // }

    return user;
}

export const userService = {
    createUserToDB, getUsersFromDB, getUserFromDB
}