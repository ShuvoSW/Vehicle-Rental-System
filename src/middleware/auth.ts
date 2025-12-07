import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/DB";


const auth = (...roles: any[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const authHeader = req.headers.authorization
         if (!authHeader) {
            return res.status(401).json({
               success: false,
               message: "Token is null"
            });
         }
         const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
         const decoded = jwt.verify(token as string, config.JWT_SECRET as string) as JwtPayload

         const user = await pool.query(`SELECT * FROM users WHERE email =$1`, [decoded.email])
         if (user.rows.length == 0) {
            return res.status(404).json({
               success: false,
               message: "User not found"
            })
         }
         if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({
               success: false,
               message: "Forbidden: You are not authorized"
            })
         }
         (req as any).user = decoded
        
         next()
      } catch (error: any) {
         return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message || error
         });
      }

   }

}

export default auth