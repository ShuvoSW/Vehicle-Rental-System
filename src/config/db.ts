import { Pool } from "pg";
import config from ".";

 export const pool = new Pool({
    connectionString: `${config.connection_str}`
})

const initDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS customers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL, 
        email VARCHAR(150) UNIQUE NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15),
        role VARCHAR(50) NOT NULL
        )
        `)
}

export default initDb;