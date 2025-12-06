import { Request, Response, Router } from "express"
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const {emil, password} = req.body;

    try{
        const result = await authServices.loginUser(emil, password);
        res.status(200).json({
            success: false,
            message: "Login Successful",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    } 
}

export const authController = {
    loginUser
}