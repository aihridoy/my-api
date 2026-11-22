import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error("Database is not connected");
};

export const pool = new Pool({
    connectionString
});

export const initDB = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            age INT,
            role VARCHAR(20) DEFAULT 'user',
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )`);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS profile (
            id SERIAL PRIMARY KEY, 
            user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE, 
            bio TEXT, 
            address TEXT, 
            phone VARCHAR(15), 
            gender VARCHAR(15), 
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )`)
        console.log("db connected")
    } catch (error) {
        console.error("Database init failed:", error)
        process.exit(1)
    }
};