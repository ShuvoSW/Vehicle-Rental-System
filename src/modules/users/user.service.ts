import { Response } from "express"
import { pool } from "../../config/DB"


const getAllUserDB = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result
}

const updateUserDB = async (data: Record<string, unknown>, user: any, id: any, res: Response) => {
    const { name, email, phone, role } = data
    let result
    if (user.role == 'admin') {
        result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`, [name, email, phone, role, id])
    }

    if (user.role !== 'admin' && user.id !== id) {
        return res.status(403).json({
            success: false,
            message: "only admin and owner update this user"
        })
    }

    if (user.role !== 'admin') {
        result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING*`, [name, email, phone, role, user.id])

    }
    return result;
}
const deleteUserDB = async (id: any) => {

    const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING*`, [id])
    return result;
}

export const userService = {
    getAllUserDB,
    updateUserDB,
    deleteUserDB
}