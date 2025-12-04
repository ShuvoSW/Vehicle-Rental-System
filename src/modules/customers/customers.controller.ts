import { Request, Response } from "express";
import { customerServices } from "./customers.service";

const createCustomer = async (req: Request, res: Response) => {
    try{
        const result = await customerServices.createCustomer(req.body);

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

export const customersControllers = {
    createCustomer
}