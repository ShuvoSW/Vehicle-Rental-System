import { Request, Response } from "express";
import { userServices } from "./customers.service";

const createUser = async (req: Request, res: Response) => {
    try{
        const result = await userServices.createUser(req.body);

        return res.status(201).json({
            success: false,
            message: "Data Inserted Successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const usersControllers = {
    createUser
}