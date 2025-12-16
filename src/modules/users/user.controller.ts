import { Request, Response } from "express"
import { userService } from "./user.service"

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUserDB()
        res.status(200).json({
            "success": true,
            "message": "Users retrieved successfully",
            "data": result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}


const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUserDB(req.body, (req as any).user, req.params.id, res) as any
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: 'user not found'
            })
        } else {
            res.status(201).json({
                "success": true,
                "message": "User updated successfully",
                "data": result.rows
            })
        }


    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUserDB(req.params.id,res)as any
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: 'user not found'
            })
        } else {
            res.status(201).json({
                "success": true,
                "message": "User deleted successfully"
            })
        }

    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}



export const userController = {
    getAllUser,
    updateUser,
    deleteUser,
}
