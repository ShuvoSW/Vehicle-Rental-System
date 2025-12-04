import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
const createCustomer = async (payload: Record<string, unknown>) => {
    const {name, role, email, password} = payload;
    
    const hashedPass = await bcrypt.hash(password as string, 10)
    const result = await pool.query(`INSERT INTO customers(name, role, email, password) VALUES($1, $2, $3, $4) RETURNING *`, [name, role, email, hashedPass])
    
    return result;

}

export const customerServices = {
    createCustomer
}