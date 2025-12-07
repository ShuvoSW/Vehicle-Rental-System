import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

const createUSerBD = async (payload: Record<string, any>) => {
    const { name, email, password, phone, role } = payload;


    const hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
        [name, email, hashedPass, phone, role])
    return result;
}

const loginUserBD = async (payload: Record<string, any>) => {
    const { email, password, } = payload;


    const result = await pool.query(`SELECT * FROM users WHERE email =$1`, [email])
    if (result.rows.length === 0) {
        return null
    }
    let user = result.rows[0]

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return false
    }

    const secret = config.JWT_SECRET as string
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role, id: user.id }, secret, {
        expiresIn: '30d'
    })

    user = (await pool.query(`SELECT id, name, email, phone, role FROM users WHERE email =$1`, [email])).rows[0]

    return { token, user };
}

export const authService = {
    createUSerBD,
    loginUserBD,
}