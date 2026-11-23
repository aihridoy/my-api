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

const updateUserFromDB = async (payload: IUser, id: string) => {
    const { name, password, age, is_active, role } = payload;
    return await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_active = COALESCE($4, is_active),
            role = COALESCE($5, role),
            updated_at = NOW()

            WHERE id=$6 RETURNING *
            `, [name ?? null, password ?? null, age ?? null, is_active ?? null, role ?? null, id])
}

const deleteUserFromDB = async (id: string) => {
    return await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id])
}

export const userService = {
    createUserToDB, getUsersFromDB, getUserFromDB, updateUserFromDB, deleteUserFromDB
}
